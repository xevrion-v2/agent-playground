# Environment Variables

TaskFlow uses environment variables to configure database connections, authentication, and third-party integrations. Each package and app may require its own `.env` file or rely on a root-level `.env`.

## Quick Start

Create a `.env` file at the repository root:

```bash
cp .env.example .env
# edit .env with your own values
```

## All Variables

### Database

| Variable | Required | Default | Used By | Description |
|---|---|---|---|---|
| `DATABASE_URL` | Yes | — | `packages/db` (Prisma) | PostgreSQL connection string. Example: `postgresql://user:password@localhost:5432/taskflow` |

### API Server (`apps/api`)

| Variable | Required | Default | Description |
|---|---|---|---|
| `PORT` | No | `4000` | HTTP port the Express server listens on. |
| `DATABASE_URL` | Yes | — | Same PostgreSQL connection string used by Prisma. |
| `JWT_SECRET` | Yes | — | Secret key for signing and verifying JSON Web Tokens. Generate with `openssl rand -hex 64`. |
| `JWT_REFRESH_SECRET` | No | — | Separate secret for refresh tokens. Falls back to `JWT_SECRET` if unset. |

### Web Frontend (`apps/web`)

| Variable | Required | Default | Description |
|---|---|---|---|
| `NEXT_PUBLIC_API_URL` | No | `http://localhost:4000` | Base URL of the API server the frontend calls. |
| `NEXT_PUBLIC_APP_URL` | No | `http://localhost:3000` | Canonical URL of the deployed web app (used for OAuth redirects, etc.). |

### Payments (Stripe)

| Variable | Required | Default | Description |
|---|---|---|---|
| `STRIPE_SECRET_KEY` | No | — | Stripe secret key (`sk_live_...` or `sk_test_...`). Required for payment processing. |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | No | — | Stripe publishable key (`pk_live_...` or `pk_test_...`). Required for client-side Stripe Elements. |
| `STRIPE_WEBHOOK_SECRET` | No | — | Stripe webhook signing secret (`whsec_...`). Required to verify incoming webhook events. |

### OAuth (Sign in with Google / GitHub)

| Variable | Required | Default | Description |
|---|---|---|---|
| `GOOGLE_CLIENT_ID` | No | — | Google OAuth 2.0 client ID. |
| `GOOGLE_CLIENT_SECRET` | No | — | Google OAuth 2.0 client secret. |
| `GITHUB_CLIENT_ID` | No | — | GitHub OAuth App client ID. |
| `GITHUB_CLIENT_SECRET` | No | — | GitHub OAuth App client secret. |

## Per-Package `.env` Files

Each app can have its own `.env` file for local overrides:

```
agent-playground/
├── .env                  # root-level, shared by all packages
├── apps/
│   ├── api/
│   │   └── .env          # API-specific overrides (PORT, JWT_SECRET, etc.)
│   └── web/
│       └── .env.local    # Next.js local overrides (NEXT_PUBLIC_*)
└── packages/
    └── db/
        └── .env          # Prisma overrides (DATABASE_URL)
```

Next.js also reads `.env.local`, `.env.development`, and `.env.production` — see the [Next.js environment variables docs](https://nextjs.org/docs/app/building-your-application/configuring/environment-variables) for the full load order.

## Example `.env` (development)

```env
# Database
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/taskflow

# API
PORT=4000
JWT_SECRET=dev-secret-change-in-production

# Web
NEXT_PUBLIC_API_URL=http://localhost:4000
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Stripe (test mode)
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# OAuth (optional for local dev)
# GOOGLE_CLIENT_ID=...
# GOOGLE_CLIENT_SECRET=...
# GITHUB_CLIENT_ID=...
# GITHUB_CLIENT_SECRET=...
```

## Running the App

```bash
# Install dependencies
npm install

# Generate Prisma client (requires DATABASE_URL)
npx prisma generate

# Run database migrations
npx prisma migrate dev

# Start both API and web in development mode
npm run dev
```
