# Environment Variables

## API (`apps/api`)

| Variable | Required | Description |
|----------|----------|-------------|
| `PORT` | No | HTTP port (default `4000`) |
| `DATABASE_URL` | Yes (prod) | PostgreSQL connection string for Prisma |
| `JWT_SECRET` | Yes (auth) | Signing secret for access tokens |
| `NODE_ENV` | No | `development` or `production` |

## Web (`apps/web`)

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_API_URL` | Yes | Base URL of the TaskFlow API |
| `NEXTAUTH_SECRET` | Yes (auth) | NextAuth session encryption secret |
| `NEXTAUTH_URL` | Yes | Public site URL for OAuth callbacks |

## Database package (`packages/db`)

Uses `DATABASE_URL` from the environment when running Prisma CLI commands.
