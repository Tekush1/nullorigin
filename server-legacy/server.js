const http = require('http');
const fs = require('fs/promises');
const path = require('path');
const crypto = require('crypto');
const {DatabaseSync} = require('node:sqlite');

const PORT = Number(process.env.PORT || 3000);
const ROOT = __dirname;
const DATA_DIR = path.join(ROOT, 'data');
const DB_FILE = path.join(DATA_DIR, 'null-origin.sqlite');
const MAX_BODY_BYTES = 20 * 1024;
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 20;
const ALLOWED_ORIGINS = new Set([
  'http://localhost:3000',
  'http://127.0.0.1:3000',
  'http://localhost:5500',
  'http://127.0.0.1:5500'
]);
const blockedStaticDirs = new Set(['.git', '.agents', 'data', 'node_modules']);
const rateLimitBuckets = new Map();
let db;

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

function getSecurityHeaders(){
  return {
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'Referrer-Policy': 'no-referrer',
    'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
    'Content-Security-Policy': [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline'",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com",
      "img-src 'self' data:",
      "connect-src 'self' http://localhost:3000 http://127.0.0.1:3000"
    ].join('; ')
  };
}

function getCorsHeaders(req){
  const origin = req.headers.origin;

  if(origin && ALLOWED_ORIGINS.has(origin)){
    return {
      'Access-Control-Allow-Origin': origin,
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Vary': 'Origin'
    };
  }

  return {};
}

function sendText(req, res, statusCode, text){
  res.writeHead(statusCode, {
    ...getSecurityHeaders(),
    ...getCorsHeaders(req),
    'Content-Type': 'text/plain; charset=utf-8'
  });
  res.end(text);
}

function sendJson(res, statusCode, payload){
  res.writeHead(statusCode, {
    ...getSecurityHeaders(),
    'Content-Type': 'application/json; charset=utf-8',
  });
  res.end(JSON.stringify(payload));
}

function sendApiJson(req, res, statusCode, payload){
  res.writeHead(statusCode, {
    ...getSecurityHeaders(),
    ...getCorsHeaders(req),
    'Content-Type': 'application/json; charset=utf-8'
  });
  res.end(JSON.stringify(payload));
}

function normalizeText(value){
  return String(value || '').replace(/\s+/g, ' ').trim();
}

function limitText(value, label, maxLength, errors){
  const text = normalizeText(value);

  if(text.length > maxLength){
    errors.push(label + ' must be ' + maxLength + ' characters or fewer.');
  }

  return text;
}

function isValidEmail(value){
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);
}

function clientKey(req){
  return req.socket.remoteAddress || 'unknown';
}

function isRateLimited(req){
  const key = clientKey(req);
  const now = Date.now();
  const bucket = rateLimitBuckets.get(key) || {count: 0, resetAt: now + RATE_LIMIT_WINDOW_MS};

  if(now > bucket.resetAt){
    bucket.count = 0;
    bucket.resetAt = now + RATE_LIMIT_WINDOW_MS;
  }

  bucket.count += 1;
  rateLimitBuckets.set(key, bucket);
  return bucket.count > RATE_LIMIT_MAX_REQUESTS;
}

function cleanupRateLimits(){
  const now = Date.now();
  for(const [key, bucket] of rateLimitBuckets.entries()){
    if(now > bucket.resetAt){
      rateLimitBuckets.delete(key);
    }
  }
}

function validateRegistration(body){
  const errors = [];
  const teamName = limitText(body.teamName, 'Team name', 80, errors);
  const country = limitText(body.country, 'Country', 60, errors);
  const leaderName = limitText(body.leaderName, 'Leader name', 80, errors);
  const leaderEmail = limitText(body.leaderEmail, 'Leader email', 120, errors).toLowerCase();
  const members = Array.isArray(body.members) ? body.members : [];

  if(!teamName) errors.push('Team name is required.');
  if(!country) errors.push('Country is required.');
  if(!leaderName) errors.push('Leader name is required.');
  if(!leaderEmail) errors.push('Leader email is required.');
  if(leaderEmail && !isValidEmail(leaderEmail)) errors.push('Leader email is invalid.');

  const cleanedMembers = members
    .slice(0, 4)
    .map(function(member){
      return {
        discord: limitText(member && member.discord, 'Discord username', 40, errors),
        ctftime: limitText(member && member.ctftime, 'CTFtime profile', 160, errors)
      };
    })
    .filter(function(member){
      return member.discord || member.ctftime;
    });

  if(!cleanedMembers.length){
    errors.push('At least one member is required.');
  }

  cleanedMembers.forEach(function(member, index){
    const label = 'Member ' + (index + 1);
    if(!member.discord) errors.push(label + ' Discord username is required.');
    if(!member.ctftime) errors.push(label + ' CTFtime profile is required.');
  });

  if(body.agree !== true){
    errors.push('Rules agreement is required.');
  }

  return {
    errors,
    registration: {
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      teamName,
      country,
      leaderName,
      leaderEmail,
      members: cleanedMembers
    }
  };
}

async function readRequestBody(req){
  const chunks = [];
  let totalBytes = 0;

  if(!String(req.headers['content-type'] || '').toLowerCase().includes('application/json')){
    const error = new Error('Content-Type must be application/json.');
    error.statusCode = 415;
    throw error;
  }

  for await (const chunk of req){
    totalBytes += chunk.length;
    if(totalBytes > MAX_BODY_BYTES){
      const error = new Error('Request body too large.');
      error.statusCode = 413;
      throw error;
    }
    chunks.push(chunk);
  }

  if(!chunks.length) return {};

  try {
    return JSON.parse(Buffer.concat(chunks).toString('utf8'));
  } catch (error) {
    error.statusCode = 400;
    error.message = 'Invalid JSON.';
    throw error;
  }
}

async function initDatabase(){
  await fs.mkdir(DATA_DIR, {recursive: true});

  db = new DatabaseSync(DB_FILE);
  db.exec(`
    PRAGMA journal_mode = WAL;
    PRAGMA foreign_keys = ON;

    CREATE TABLE IF NOT EXISTS registrations (
      id TEXT PRIMARY KEY,
      created_at TEXT NOT NULL,
      team_name TEXT NOT NULL UNIQUE COLLATE NOCASE,
      country TEXT NOT NULL,
      leader_name TEXT NOT NULL,
      leader_email TEXT NOT NULL UNIQUE COLLATE NOCASE
    );

    CREATE TABLE IF NOT EXISTS registration_members (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      registration_id TEXT NOT NULL,
      member_order INTEGER NOT NULL,
      discord TEXT NOT NULL,
      ctftime TEXT NOT NULL,
      FOREIGN KEY (registration_id) REFERENCES registrations(id) ON DELETE CASCADE
    );
  `);
}

async function saveRegistration(registration){
  const duplicate = db.prepare(`
    SELECT id
    FROM registrations
    WHERE team_name = ? COLLATE NOCASE OR leader_email = ? COLLATE NOCASE
    LIMIT 1
  `).get(registration.teamName, registration.leaderEmail);

  if(duplicate){
    const error = new Error('Team name or leader email is already registered.');
    error.statusCode = 409;
    throw error;
  }

  const insertRegistration = db.prepare(`
    INSERT INTO registrations (id, created_at, team_name, country, leader_name, leader_email)
    VALUES (?, ?, ?, ?, ?, ?)
  `);
  const insertMember = db.prepare(`
    INSERT INTO registration_members (registration_id, member_order, discord, ctftime)
    VALUES (?, ?, ?, ?)
  `);

  try {
    db.exec('BEGIN');
    insertRegistration.run(
      registration.id,
      registration.createdAt,
      registration.teamName,
      registration.country,
      registration.leaderName,
      registration.leaderEmail
    );

    registration.members.forEach(function(member, index){
      insertMember.run(registration.id, index + 1, member.discord, member.ctftime);
    });

    db.exec('COMMIT');
  } catch (error) {
    db.exec('ROLLBACK');
    throw error;
  }
}

async function handleRegister(req, res){
  try {
    if(isRateLimited(req)){
      sendApiJson(req, res, 429, {ok: false, errors: ['Too many registration attempts. Try again later.']});
      return;
    }

    const body = await readRequestBody(req);
    const result = validateRegistration(body);

    if(result.errors.length){
      sendApiJson(req, res, 400, {ok: false, errors: result.errors});
      return;
    }

    await saveRegistration(result.registration);
    sendApiJson(req, res, 201, {
      ok: true,
      message: 'Registration saved.',
      registrationId: result.registration.id
    });
  } catch (error) {
    const statusCode = error.statusCode || 500;
    const message = statusCode >= 500 ? 'Server could not save this registration.' : error.message;
    sendApiJson(req, res, statusCode, {ok: false, errors: [message]});
  }
}

function isBlockedStaticPath(requestedPath){
  const relative = path.relative(ROOT, requestedPath);
  const parts = relative.split(path.sep);
  return parts.some(function(part){
    return blockedStaticDirs.has(part) || part.startsWith('.');
  });
}

async function serveStatic(req, res){
  if(req.method !== 'GET' && req.method !== 'HEAD'){
    sendText(req, res, 405, 'Method not allowed');
    return;
  }

  const url = new URL(req.url, 'http://localhost');
  const pathname = url.pathname === '/' ? '/index.html' : decodeURIComponent(url.pathname);
  const requestedPath = path.resolve(ROOT, '.' + pathname);

  if(!requestedPath.startsWith(ROOT + path.sep) || isBlockedStaticPath(requestedPath)){
    sendText(req, res, 403, 'Forbidden');
    return;
  }

  try {
    const file = await fs.readFile(requestedPath);
    const contentType = MIME_TYPES[path.extname(requestedPath).toLowerCase()] || 'application/octet-stream';
    res.writeHead(200, {...getSecurityHeaders(), 'Content-Type': contentType});
    res.end(req.method === 'HEAD' ? undefined : file);
  } catch (error) {
    sendText(req, res, 404, 'Not found');
  }
}

const server = http.createServer(function(req, res){
  if(req.method === 'OPTIONS'){
    sendApiJson(req, res, 204, {});
    return;
  }

  if(req.url === '/api/register' && req.method === 'POST'){
    handleRegister(req, res);
    return;
  }

  serveStatic(req, res);
});

setInterval(cleanupRateLimits, RATE_LIMIT_WINDOW_MS).unref();

initDatabase()
  .then(function(){
    server.listen(PORT, function(){
      console.log('Null Origin backend running at http://localhost:' + PORT);
      console.log('SQLite database: ' + DB_FILE);
    });
  })
  .catch(function(error){
    console.error('Failed to start backend:', error);
    process.exit(1);
  });
