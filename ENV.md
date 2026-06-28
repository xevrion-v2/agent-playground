# Environment Variables

## API (`apps/api`)

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `PORT` | No | `4000` | HTTP server port |

## Database (`packages/db`)

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `DATABASE_URL` | Yes | — | PostgreSQL connection string |

## Web (`apps/web`)

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `NEXT_PUBLIC_API_URL` | No | `http://localhost:4000` | API base URL

## Development

```bash
# .env
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/taskflow
NEXT_PUBLIC_API_URL=http://localhost:4000
```
