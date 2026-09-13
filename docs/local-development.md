# Local Development

## Prerequisites

- Node.js >= 18
- pnpm (recommended) or npm
- PostgreSQL (for database-dependent features)

## Setup

```bash
# Install dependencies
pnpm install

# Copy environment files
cp apps/api/.env.example apps/api/.env
cp packages/db/.env.example packages/db/.env

# Set up the database
cd packages/db
pnpm db:migrate
cd ../..
```

## Run

```bash
# Start all workspaces in dev mode
pnpm dev

# Start only the API
cd apps/api && pnpm dev

# Start only the web app
cd apps/web && pnpm dev
```

## Test

```bash
pnpm test          # Run all tests
pnpm test:watch    # Watch mode
```

## Lint

```bash
pnpm lint
```

## Common issues

- **Port conflict** — ensure `PORT=4000` (API) and `PORT=3000` (web) are not already in use.
- **Database** — verify `DATABASE_URL` in `.env` points to a running PostgreSQL instance.
