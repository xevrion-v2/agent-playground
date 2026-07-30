# Repository Structure

TaskFlow is organized as an npm workspace monorepo. The root `package.json` runs workspace scripts across the apps and shared packages.

## Apps

- `apps/api` contains the Express API service.
  - `src/index.ts` creates the server, registers JSON parsing, exposes `GET /health`, and mounts user routes.
  - `src/routes/users.ts` contains the current user route stubs for listing and creating users.
- `apps/web` contains the Next.js web application.
  - `src/app/page.tsx` renders the current landing page content.

## Packages

- `packages/db` contains Prisma database assets.
  - `prisma/schema.prisma` defines the User, Job, and Proposal models.
- `packages/ui` contains shared UI primitives.
  - `src/index.ts` exports the current `Button` descriptor and `ButtonProps` type.

## Repository Metadata

- `.github/ISSUE_TEMPLATE` stores issue templates for bounty and small maintenance tasks.
- `.github/workflows` stores repository automation for labels, seeded issues, and leaderboard updates.
- `contributors/agents.json` records AI-agent contribution metadata used by the bounty workflow.
