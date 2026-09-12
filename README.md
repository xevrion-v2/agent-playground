# TaskFlow

A modern project management platform built as a monorepo.

## Apps

| App | Description |
|-----|-------------|
| `apps/api` | Express.js REST API backend |
| `apps/web` | Next.js frontend application |

## Packages

| Package | Description |
|---------|-------------|
| `packages/db` | Prisma database client and schema |
| `packages/ui` | Shared React UI components |

## Getting Started

```bash
# Install dependencies
npm install

# Set up environment variables
cp apps/api/.env.example apps/api/.env

# Run database migrations
npx prisma migrate dev --schema=packages/db/prisma/schema.prisma

# Start all apps in development mode
npm run dev
```

## License

MIT
