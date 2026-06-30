# Environment Variables

This document describes the environment variables used by each workspace
in the TaskFlow monorepo. Create a `.env` file in the root of the relevant
workspace (or a single root `.env` that workspaces inherit via dotenv).

> **Note:** `.env` files are gitignored. Use this document as a reference
> when setting up your local environment.

---

## Database (`packages/db`)

| Variable         | Required | Default | Description                                        |
|------------------|----------|---------|----------------------------------------------------|
| `DATABASE_URL`   | Yes      | —       | PostgreSQL connection string for Prisma.            |

The Prisma schema references `DATABASE_URL` directly via `env("DATABASE_URL")`.
For local development you can use a local PostgreSQL instance or a cloud service
such as Neon, Railway, or Supabase.

**Example:**
```
DATABASE_URL="postgresql://user:password@localhost:5432/taskflow?schema=public"
```

---

## API (`apps/api`)

| Variable | Required | Default | Description                                 |
|----------|----------|---------|---------------------------------------------|
| `PORT`   | No       | `4000`  | Port the Express server listens on.          |

Used in `apps/api/src/index.ts` as:
```ts
const port = process.env.PORT || 4000;
```

**Example:**
```
PORT=4000
```

---

## Web (`apps/web`)

The Next.js frontend currently has **no** runtime environment variable references
in its source code. Future additions may include:

- `NEXT_PUBLIC_API_URL` — Base URL for the API server (e.g. `http://localhost:4000`)
- `NEXT_PUBLIC_APP_NAME` — Application display name

Refer to the [Next.js Environment Variables documentation](https://nextjs.org/docs/app/building-your-application/configuring/environment-variables)
for prefixing rules (`NEXT_PUBLIC_` for client-side vars).

---

## Future / Planned variables

Based on the issue descriptions and README, the following variables are expected
to be added as the project grows:

| Variable              | Scope         | Likely purpose                              |
|-----------------------|---------------|---------------------------------------------|
| `JWT_SECRET`          | API           | Signing JSON Web Tokens for auth            |
| `JWT_REFRESH_SECRET`  | API           | Signing refresh tokens                      |
| `STRIPE_SECRET_KEY`   | API           | Stripe payment processing                   |
| `STRIPE_WEBHOOK_SECRET` | API         | Verifying Stripe webhook payloads           |
| `AUTH_OAUTH_CLIENT_ID`   | API        | OAuth provider client ID                    |
| `AUTH_OAUTH_CLIENT_SECRET` | API      | OAuth provider client secret                |
| `NODE_ENV`            | API / Web     | Runtime environment (`development`, `production`, `test`) |

---

## Quick Setup

```bash
# 1. Copy this template into a root .env file
cp ENV.md .env   # or create .env manually

# 2. Fill in your values
# Example:
# DATABASE_URL="postgresql://postgres:secret@localhost:5432/taskflow"
# PORT=4000
```

All apps and packages will then read the relevant variables from the environment
when started via `npm run dev`.
