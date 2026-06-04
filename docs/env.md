# Environment Variables

This document describes the environment variables required by each workspace in the monorepo.

## Usage

Copy the example file to `.env` and fill in your values:

```bash
cp .env.example .env
```

Each app/package reads environment variables from the root `.env` file.

## Variables

| Variable | Default | Required | Description |
|----------|---------|----------|-------------|
| `DATABASE_URL` | — | **Yes** | PostgreSQL connection string for Prisma. Format: `postgresql://USER:PASS@HOST:PORT/DATABASE` |
| `PORT` | `4000` | No | Port for the Express API server. |

## Per-package notes

| Package | Reads |
|---------|-------|
| `apps/api` | `PORT` — HTTP server port |
| `packages/db` | `DATABASE_URL` — Prisma datasource |
