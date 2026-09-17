# Environment Variables

This document describes the environment variables required for local development of the TaskFlow monorepo.

## API (`apps/api`)

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `PORT` | No | `4000` | Port the Express API server listens on |
| `NODE_ENV` | No | `development` | Runtime environment (`development`, `production`, `test`) |

## Database (`packages/db`)

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `DATABASE_URL` | Yes | — | PostgreSQL connection string (e.g., `postgresql://user:pass@localhost:5432/taskflow`) |

## Web (`apps/web`)

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `NEXT_PUBLIC_API_URL` | No | `http://localhost:4000` | Public API base URL used by the Next.js frontend |
| `NODE_ENV` | No | `development` | Runtime environment (`development`, `production`, `test`) |

## Notes

- Create a `.env` file in each workspace root (`apps/api/.env`, `apps/web/.env`, `packages/db/.env`) or export variables in your shell before running dev commands.
- Never commit `.env` files to version control. Add them to `.gitignore`.
- For production deployments, configure these variables through your hosting provider's secrets management system.

Closes #4
