# @taskflow/db

Prisma schema and database utilities for the TaskFlow monorepo.

## Schema location

The Prisma schema lives at `prisma/schema.prisma` and defines `User`, `Job`, and `Proposal` models backed by PostgreSQL.

## Environment variables

| Variable | Required | Purpose |
| --- | --- | --- |
| `DATABASE_URL` | Yes | PostgreSQL connection string used by Prisma (`env("DATABASE_URL")` in the schema). |

Example for local validation:

```bash
export DATABASE_URL="postgresql://user:pass@localhost:5432/taskflow"
```

On PowerShell:

```powershell
$env:DATABASE_URL = "postgresql://user:pass@localhost:5432/taskflow"
```

## Validate the schema

From the repository root:

```bash
npm exec --workspace @taskflow/db -- prisma validate --schema prisma/schema.prisma
```

From this package directory:

```bash
npx prisma validate --schema prisma/schema.prisma
```

The command checks that `prisma/schema.prisma` is syntactically valid. A reachable database is not required for validation, but `DATABASE_URL` must be set because the datasource references it.

## Scripts

```bash
npm run test   # placeholder — no database tests configured yet
npm run lint   # placeholder — no database lint configured yet
```

## Notes

- This package currently ships the schema only; migrations and seed scripts are not configured in this stub workspace.
