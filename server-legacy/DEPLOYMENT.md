# Null Origin Deployment

## Local production-style run

```powershell
cd C:\Users\prerna\OneDrive\Desktop\wowi
npm start
```

Open:

```text
http://localhost:3000
```

Registrations are stored in:

```text
data/null-origin.sqlite
```

## HTTPS deployment

Deploy this Node app to a host that provides HTTPS automatically, such as Render, Railway, Fly.io, or a VPS behind Nginx/Caddy.

Use:

```text
Start command: npm start
Port: use the PORT environment variable
```

For a VPS, put the Node app behind a reverse proxy and terminate HTTPS there. Caddy is the simplest option because it can request and renew TLS certificates automatically.

Important production settings:

- Keep the `data` folder private and backed up.
- Do not serve the app from Live Server in production.
- Use a real domain with HTTPS.
- Add your production domain to `ALLOWED_ORIGINS` in `server.js`.
- Back up `data/null-origin.sqlite` regularly.
