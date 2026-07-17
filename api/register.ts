// Vercel Serverless Function: POST /api/register
//
// This replaces server.js's Node `http` server + `node:sqlite` for
// deployment on Vercel. Two things had to change to make that possible:
//
// 1. Vercel functions are stateless and short-lived, so they can't keep a
//    local SQLite file on disk between requests (or between cold starts) -
//    node:sqlite's DatabaseSync pointed at data/null-origin.sqlite would
//    just lose all data. This version talks to Turso (libSQL), which is
//    wire-compatible with SQLite (same SQL, same schema below) but runs
//    as a hosted, persistent database you can call from a serverless
//    function. Free tier: https://turso.tech
//
// 2. Everything else - validation, duplicate checks, the response shape -
//    is ported over unchanged from server.js so the frontend fetch call
//    in Register.tsx doesn't need to know the difference.
//
// Setup:
//   npm install @libsql/client
//   Create a Turso database, then set these in Vercel's project settings:
//     TURSO_DATABASE_URL
//     TURSO_AUTH_TOKEN
//
// If you'd rather keep Postgres (e.g. Vercel Postgres/Neon) or another
// store, swap out the `getDb`/`saveRegistration` functions below - the
// validation logic above them doesn't need to change.

import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient, type Client } from '@libsql/client';
import { randomUUID } from 'crypto';

const MAX_BODY_BYTES = 20 * 1024;
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 20;

// Best-effort only: this resets whenever the function cold-starts, since
// serverless instances don't share memory. For real rate limiting across
// instances, use Vercel KV / Upstash Redis instead.
const rateLimitBuckets = new Map<string, { count: number; resetAt: number }>();

let dbClient: Client | null = null;

async function getDb(): Promise<Client> {
  if (dbClient) return dbClient;

  const url = process.env.TURSO_DATABASE_URL;
  const authToken = process.env.TURSO_AUTH_TOKEN;
  if (!url) {
    throw new Error('TURSO_DATABASE_URL is not configured.');
  }

  dbClient = createClient({ url, authToken });

  await dbClient.execute(`
    CREATE TABLE IF NOT EXISTS registrations (
      id TEXT PRIMARY KEY,
      created_at TEXT NOT NULL,
      team_name TEXT NOT NULL UNIQUE COLLATE NOCASE,
      country TEXT NOT NULL,
      leader_name TEXT NOT NULL,
      leader_email TEXT NOT NULL UNIQUE COLLATE NOCASE
    )
  `);
  await dbClient.execute(`
    CREATE TABLE IF NOT EXISTS registration_members (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      registration_id TEXT NOT NULL,
      member_order INTEGER NOT NULL,
      discord TEXT NOT NULL,
      ctftime TEXT NOT NULL,
      FOREIGN KEY (registration_id) REFERENCES registrations(id) ON DELETE CASCADE
    )
  `);

  return dbClient;
}

type Member = { discord: string; ctftime: string };
type Registration = {
  id: string;
  createdAt: string;
  teamName: string;
  country: string;
  leaderName: string;
  leaderEmail: string;
  members: Member[];
};

function normalizeText(value: unknown): string {
  return String(value ?? '').replace(/\s+/g, ' ').trim();
}

function limitText(value: unknown, label: string, maxLength: number, errors: string[]): string {
  const text = normalizeText(value);
  if (text.length > maxLength) {
    errors.push(`${label} must be ${maxLength} characters or fewer.`);
  }
  return text;
}

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);
}

function validateRegistration(body: any): { errors: string[]; registration: Registration } {
  const errors: string[] = [];
  const teamName = limitText(body.teamName, 'Team name', 80, errors);
  const country = limitText(body.country, 'Country', 60, errors);
  const leaderName = limitText(body.leaderName, 'Leader name', 80, errors);
  const leaderEmail = limitText(body.leaderEmail, 'Leader email', 120, errors).toLowerCase();
  const members = Array.isArray(body.members) ? body.members : [];

  if (!teamName) errors.push('Team name is required.');
  if (!country) errors.push('Country is required.');
  if (!leaderName) errors.push('Leader name is required.');
  if (!leaderEmail) errors.push('Leader email is required.');
  if (leaderEmail && !isValidEmail(leaderEmail)) errors.push('Leader email is invalid.');

  const cleanedMembers: Member[] = members
    .slice(0, 4)
    .map((member: any) => ({
      discord: limitText(member?.discord, 'Discord username', 40, errors),
      ctftime: limitText(member?.ctftime, 'CTFtime profile', 160, errors),
    }))
    .filter((member: Member) => member.discord || member.ctftime);

  if (!cleanedMembers.length) {
    errors.push('At least one member is required.');
  }

  cleanedMembers.forEach((member, index) => {
    const label = `Member ${index + 1}`;
    if (!member.discord) errors.push(`${label} Discord username is required.`);
    if (!member.ctftime) errors.push(`${label} CTFtime profile is required.`);
  });

  if (body.agree !== true) {
    errors.push('Rules agreement is required.');
  }

  return {
    errors,
    registration: {
      id: randomUUID(),
      createdAt: new Date().toISOString(),
      teamName,
      country,
      leaderName,
      leaderEmail,
      members: cleanedMembers,
    },
  };
}

async function saveRegistration(registration: Registration): Promise<void> {
  const db = await getDb();

  const duplicate = await db.execute({
    sql: `SELECT id FROM registrations WHERE team_name = ? COLLATE NOCASE OR leader_email = ? COLLATE NOCASE LIMIT 1`,
    args: [registration.teamName, registration.leaderEmail],
  });

  if (duplicate.rows.length) {
    const error: any = new Error('Team name or leader email is already registered.');
    error.statusCode = 409;
    throw error;
  }

  await db.execute({
    sql: `INSERT INTO registrations (id, created_at, team_name, country, leader_name, leader_email) VALUES (?, ?, ?, ?, ?, ?)`,
    args: [
      registration.id,
      registration.createdAt,
      registration.teamName,
      registration.country,
      registration.leaderName,
      registration.leaderEmail,
    ],
  });

  for (let i = 0; i < registration.members.length; i++) {
    const member = registration.members[i];
    await db.execute({
      sql: `INSERT INTO registration_members (registration_id, member_order, discord, ctftime) VALUES (?, ?, ?, ?)`,
      args: [registration.id, i + 1, member.discord, member.ctftime],
    });
  }
}

function clientKey(req: VercelRequest): string {
  const forwarded = req.headers['x-forwarded-for'];
  if (typeof forwarded === 'string') return forwarded.split(',')[0].trim();
  return req.socket?.remoteAddress || 'unknown';
}

function isRateLimited(req: VercelRequest): boolean {
  const key = clientKey(req);
  const now = Date.now();
  const bucket = rateLimitBuckets.get(key) || { count: 0, resetAt: now + RATE_LIMIT_WINDOW_MS };

  if (now > bucket.resetAt) {
    bucket.count = 0;
    bucket.resetAt = now + RATE_LIMIT_WINDOW_MS;
  }

  bucket.count += 1;
  rateLimitBuckets.set(key, bucket);
  return bucket.count > RATE_LIMIT_MAX_REQUESTS;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Referrer-Policy', 'no-referrer');

  if (req.method === 'OPTIONS') {
    res.status(204).end();
    return;
  }

  if (req.method !== 'POST') {
    res.status(405).json({ ok: false, errors: ['Method not allowed.'] });
    return;
  }

  if (isRateLimited(req)) {
    res.status(429).json({ ok: false, errors: ['Too many registration attempts. Try again later.'] });
    return;
  }

  const contentLength = Number(req.headers['content-length'] || 0);
  if (contentLength > MAX_BODY_BYTES) {
    res.status(413).json({ ok: false, errors: ['Request body too large.'] });
    return;
  }

  try {
    const result = validateRegistration(req.body || {});

    if (result.errors.length) {
      res.status(400).json({ ok: false, errors: result.errors });
      return;
    }

    await saveRegistration(result.registration);
    res.status(201).json({
      ok: true,
      message: 'Registration saved.',
      registrationId: result.registration.id,
    });
  } catch (error: any) {
    const statusCode = error.statusCode || 500;
    const message = statusCode >= 500 ? 'Server could not save this registration.' : error.message;
    res.status(statusCode).json({ ok: false, errors: [message] });
  }
}
