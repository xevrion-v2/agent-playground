# Environment Variables

This document describes all environment variables expected by each app and package in the TaskFlow monorepo.

---

## `apps/api` — Express API Service

Create `apps/api/.env`:

```env
# Server
PORT=4000                          # Port for the API server (default: 4000)
NODE_ENV=development               # Environment: development | test | production

# Database (required)
DATABASE_URL=postgresql://user:password@localhost:5432/taskflow

# Authentication (required)
JWT_SECRET=your-super-secret-jwt-key-min-32-chars
JWT_EXPIRES_IN=7d                  # Token expiry (default: 7d)
REFRESH_TOKEN_SECRET=your-refresh-token-secret

# OAuth (optional)
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
OAUTH_CALLBACK_URL=http://localhost:4000/auth/callback

# Payments (optional)
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# File Uploads — AWS S3 (optional)
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_REGION=us-east-1
AWS_S3_BUCKET=taskflow-uploads

# Email — SMTP (optional)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=noreply@example.com
SMTP_PASS=

# CORS
CORS_ORIGIN=http://localhost:3000  # Comma-separated for multiple origins
```

---

## `apps/web` — Next.js Frontend

Create `apps/web/.env.local`:

```env
# API
NEXT_PUBLIC_API_URL=http://localhost:4000

# Authentication — NextAuth.js (required in production)
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-nextauth-secret-min-32-chars

# OAuth (optional — must match apps/api values)
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=

# Payments (optional)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
```

---

## `packages/db` — Prisma Database Package

Create `packages/db/.env`:

```env
# Must match apps/api DATABASE_URL
DATABASE_URL=postgresql://user:password@localhost:5432/taskflow
```

> Prisma reads `DATABASE_URL` from this file when running migrations (`npx prisma migrate dev`).

---

## Required vs Optional Summary

| Variable | App | Required | Notes |
|---|---|---|---|
| `DATABASE_URL` | api, db | **Yes** | PostgreSQL connection string |
| `JWT_SECRET` | api | **Yes** | Minimum 32 characters |
| `PORT` | api | No | Default: 4000 |
| `NEXTAUTH_URL` | web | **Yes (prod)** | Canonical URL |
| `NEXTAUTH_SECRET` | web | **Yes** | Minimum 32 characters |
| `NEXT_PUBLIC_API_URL` | web | **Yes** | Backend URL |
| `STRIPE_SECRET_KEY` | api | No | Enables payments |
| `AWS_ACCESS_KEY_ID` | api | No | Enables file uploads |
| `SMTP_HOST` | api | No | Enables email |

---

## Local Development

```bash
# 1. Install dependencies
npm install

# 2. Set up environment files (see sections above)

# 3. Generate a strong secret
openssl rand -hex 32

# 4. Run database migrations
npx prisma migrate dev --schema packages/db/prisma/schema.prisma

# 5. Start services
npm run dev -w apps/api   # API on http://localhost:4000
npm run dev -w apps/web   # Web on http://localhost:3000
```

---

## Security Notes

- **Never commit `.env` files** — they are listed in `.gitignore`
- In production, set variables via your hosting platform (Vercel, Railway, Render)
- Rotate secrets immediately if accidentally exposed
