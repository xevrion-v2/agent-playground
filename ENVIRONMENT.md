# Environment Variables

This document describes all environment variables used by the TaskFlow monorepo.

## API Service (`apps/api`)

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `PORT` | No | `4000` | HTTP port the Express API server listens on. |

## Database (`packages/db`)

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `DATABASE_URL` | Yes | — | PostgreSQL connection string for Prisma. Format: `postgresql://user:password@host:port/database` |

## Usage

Create a `.env` file in the repository root (or in each package directory) with the required variables:

```bash
# Repository root .env
DATABASE_URL=postgresql://user:password@localhost:5432/taskflow
PORT=4000
```

For local development, you can use the provided Docker Compose or a local PostgreSQL instance.

## Validation

The API will fail to start if `PORT` is not a valid number.
The Prisma client will fail to connect if `DATABASE_URL` is not set or invalid.

Run Prisma schema validation to verify `DATABASE_URL` format:

```bash
cd packages/db
DATABASE_URL="your-connection-string" npx prisma@5.13.0 validate
```