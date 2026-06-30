# TaskFlow Database (`@taskflow/db`)

Prisma schema and database utilities for TaskFlow.

## Schema

The Prisma schema lives at `prisma/schema.prisma`. It defines `User`, `Job`, and
`Proposal` models backed by PostgreSQL via `DATABASE_URL`.

## Validate locally

From this package directory:

```bash
npm install
npx prisma validate --schema=prisma/schema.prisma
```

Or, when using npm scripts from a package that adds one:

```bash
npm run validate
```

## Notes

- Validation checks schema syntax and relation wiring only — it does not require
  a live database connection.
- Use `DATABASE_URL` when generating a client or running migrations against a
  real Postgres instance.
