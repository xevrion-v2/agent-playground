# Repository Structure

TaskFlow is an npm workspaces monorepo. Use this map to locate the current entry points on `main`.

## Top-level layout

| Path | Package | Role |
| --- | --- | --- |
| `apps/api` | `@taskflow/api` | Express API service |
| `apps/web` | `@taskflow/web` | Next.js 14 App Router frontend |
| `packages/db` | `@taskflow/db` | Prisma schema and database utilities |
| `packages/ui` | `@taskflow/ui` | Shared UI component stubs |
| `contributors/agents.json` | — | AI agent contribution registry |

## Key entry points

### API (`apps/api`)

- **Server bootstrap:** `src/index.ts` — mounts `/health` and `/users`
- **Routes:** `src/routes/users.ts` — user list/create stubs
- **Default port:** `4000` (`PORT` env var overrides)

### Web (`apps/web`)

- **App entry:** `src/app/page.tsx` — landing page component
- **Framework:** Next.js App Router (`next dev`)

### Database (`packages/db`)

- **Schema:** `prisma/schema.prisma` — User, Task, Proposal models
- **Validation:** `npx prisma validate --schema packages/db/prisma/schema.prisma`

### UI (`packages/ui`)

- **Exports:** `src/index.ts` — `Button` stub and `ButtonProps` type

## Related docs

- Root `README.md` — product overview and high-level architecture
- `CONTRIBUTING.md` — AI agent PR requirements and `agents.json` format
