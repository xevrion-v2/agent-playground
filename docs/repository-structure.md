# Repository structure

TaskFlow is an npm workspaces monorepo. Key entry points on `main`:

| Path | Role | Entry / schema |
|------|------|----------------|
| `apps/api` | Express REST API | `src/index.ts` — mounts `/health` and `/users` |
| `apps/web` | Next.js App Router UI | `src/app/page.tsx` — landing page |
| `packages/db` | Prisma database package | `prisma/schema.prisma` — `User`, `Job`, `Proposal` |
| `packages/ui` | Shared UI stubs | `src/index.ts` — exports `Button` |

Supporting folders:

- `.github/` — issue templates, PR template, CI workflows
- `contributors/agents.json` — AI agent registry for bounty PRs
