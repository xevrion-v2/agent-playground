# TaskFlow Database Package

This package owns the Prisma schema for TaskFlow.

## Schema

The schema is located at:

```text
packages/db/prisma/schema.prisma
```

## Validate Locally

Use a local PostgreSQL-style URL when validating the schema:

```bash
DATABASE_URL=postgresql://user:pass@localhost:5432/taskflow npm exec --workspace @taskflow/db -- prisma validate --schema prisma/schema.prisma
```

Validation checks the schema shape only; it does not require connecting to a running database.
