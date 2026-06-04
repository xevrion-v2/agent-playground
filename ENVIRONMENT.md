# Environment Variables

## API (`apps/api`)

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `PORT` | No | `4000` | Port the API server listens on |
| `DATABASE_URL` | Yes | — | PostgreSQL connection string (e.g. `postgresql://user:pass@localhost:5432/taskflow`) |
| `NODE_ENV` | No | `development` | Runtime environment (`development`, `production`, `test`) |

## Web (`apps/web`)

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `PORT` | No | `3000` | Port the web server listens on |
| `API_URL` | Yes | `http://localhost:4000` | Base URL of the TaskFlow API |

## Quick Start

```bash
# Copy the example and fill in values
cp .env.example .env

# API
cd apps/api
PORT=4000 DATABASE_URL=postgresql://localhost:5432/taskflow npm run dev

# Web
cd apps/web
PORT=3000 API_URL=http://localhost:4000 npm run dev
```
