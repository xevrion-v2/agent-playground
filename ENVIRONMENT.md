# Environment Variables

## apps/web

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `NEXT_PUBLIC_API_URL` | Yes | `http://localhost:4000` | Backend API base URL |
| `NEXT_PUBLIC_APP_URL` | Yes | `http://localhost:3000` | Frontend application URL |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Yes | — | Clerk authentication public key |

## apps/api

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `PORT` | No | `4000` | API server port |
| `DATABASE_URL` | Yes | — | PostgreSQL connection string |
| `JWT_SECRET` | Yes | — | JWT signing secret |
| `CLERK_SECRET_KEY` | Yes | — | Clerk secret key for webhook verification |
| `STRIPE_SECRET_KEY` | No | — | Stripe API secret key |
| `STRIPE_WEBHOOK_SECRET` | No | — | Stripe webhook signing secret |

## packages/db

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `DATABASE_URL` | Yes | — | Prisma database connection string |

## Example .env.local (apps/web)

```
NEXT_PUBLIC_API_URL=http://localhost:4000
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## Example .env (apps/api)

```
PORT=4000
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/taskflow
JWT_SECRET=your-jwt-secret-here
```
