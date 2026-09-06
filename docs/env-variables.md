# Environment Variables

This document describes the local environment variables expected by the TaskFlow apps.

## API (`apps/api`)

| Variable        | Required | Default | Description                                                        |
| --------------- | -------- | ------- | ------------------------------------------------------------------ |
| `PORT`          | No       | `4000`  | Port the Express server listens on.                                |
| `DATABASE_URL`  | Yes*     | —       | PostgreSQL connection string used by Prisma.                       |
| `NODE_ENV`      | No       | `development` | Runtime mode; set to `production` for deployed environments.  |

\* Only required when the Prisma-backed data layer is enabled. The route stubs run without a database.

## Web (`apps/web`)

| Variable        | Required | Default | Description                                                        |
| --------------- | -------- | ------- | ------------------------------------------------------------------ |
| `NEXT_PUBLIC_API_URL` | No | `http://localhost:4000` | Base URL the web app uses to reach the API.              |
| `PORT`          | No       | `3000`  | Port the Next.js dev server listens on.                            |

## Database (`packages/db`)

| Variable        | Required | Description                                                        |
| --------------- | -------- | ------------------------------------------------------------------ |
| `DATABASE_URL`  | Yes      | PostgreSQL connection string shared with the API.                  |

> Tip: copy this list into a local `.env` file (never commit secrets) when running the stack locally.
