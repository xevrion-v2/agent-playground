# Repository Structure

Agent Playground is a **TaskFlow** full-stack monorepo using [npm workspaces](https://docs.npmjs.com/cli/v10/using-npm/workspaces).

```
agent-playground/
├── apps/                    # Runnable applications
│   ├── api/                 # Express.js backend (port 4000)
│   │   ├── src/
│   │   │   ├── index.ts     # App entry point, middleware setup
│   │   │   └── routes/
│   │   │       └── users.ts # REST routes for users
│   │   └── package.json
│   └── web/                 # Next.js 14 App Router frontend
│       ├── src/
│       │   └── app/
│       │       └── page.tsx # Landing page
│       └── package.json
├── packages/                # Shared libraries
│   ├── db/                  # Prisma schema & database utilities
│   │   ├── prisma/
│   │   │   └── schema.prisma  # User, Job, Proposal models
│   │   └── package.json
│   └── ui/                  # Shared UI components
│       ├── src/
│       │   └── index.ts
│       └── package.json
├── contributors/
│   └── agents.json          # AI agent registry
├── .github/                 # Issue templates, workflows, PR template
├── docs/                    # Project documentation
├── package.json             # Root workspace config
├── README.md                # Project overview
├── CONTRIBUTING.md          # Contribution guidelines
└── SECURITY.md              # Security policy
```

## Workspace Paths

The root `package.json` defines two workspace globs:

```json
{
  "workspaces": ["apps/*", "packages/*"]
}
```

This resolves to four packages:

| Package        | Path              | npm workspace name   |
|----------------|-------------------|----------------------|
| API            | `apps/api`        | `@taskflow/api`      |
| Web frontend   | `apps/web`        | `@taskflow/web`      |
| Database       | `packages/db`     | `@taskflow/db`       |
| UI components  | `packages/ui`     | `@taskflow/ui`       |

## App Structure Details

### API (`apps/api`)

- **Framework**: Express.js with ESM modules (`"type": "module"`)
- **Entry**: `src/index.ts` — starts an Express server on `process.env.PORT || 4000`
- **Routes**: `src/routes/users.ts` — stub user listing and creation endpoints
- **Runtime**: Runs via `tsx` (TypeScript execute) with `npm run dev -w @taskflow/api`
- **Dependencies**: Express, tsx, TypeScript

### Web (`apps/web`)

- **Framework**: Next.js 14 with App Router
- **Entry**: `src/app/page.tsx` — landing page
- **Runtime**: `next dev` via `npm run dev -w @taskflow/web`
- **Dependencies**: Next.js, React 18

### Database (`packages/db`)

- **ORM**: Prisma (PostgreSQL)
- **Schema**: `prisma/schema.prisma` with models for `User`, `Job`, `Proposal`
- **Runtime**: `prisma validate` via `npm run validate -w @taskflow/db`

### UI (`packages/ui`)

- **Purpose**: Shared UI component library
- **Entry**: `src/index.ts`
- **Dependencies**: TypeScript only

## Environment Variables

Each app/package expects a `.env` file in its directory:

| App/Package | Expected variables                          |
|-------------|---------------------------------------------|
| `apps/api`  | `PORT` (optional, defaults to 4000)         |
| `packages/db` | `DATABASE_URL` — PostgreSQL connection string |
