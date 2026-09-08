# TaskFlow Database Package

Prisma schema and database utilities for the TaskFlow workspace.

## Schema Location

The Prisma schema lives at:

```text
packages/db/prisma/schema.prisma
```

The current schema uses a PostgreSQL datasource and reads the connection string from `DATABASE_URL`.

## Validate The Schema

Run validation from the repository root:

```sh
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/taskflow?schema=public" npx prisma validate --schema packages/db/prisma/schema.prisma
```

On Windows PowerShell:

```powershell
$env:DATABASE_URL = "postgresql://postgres:postgres@localhost:5432/taskflow?schema=public"
npx prisma validate --schema packages/db/prisma/schema.prisma
Remove-Item Env:DATABASE_URL
```

The command validates the schema shape and datasource configuration. It does not run migrations or connect to a production database.

## Package Scripts

The package currently exposes placeholder scripts:

```sh
npm run test -w packages/db
npm run lint -w packages/db
```
