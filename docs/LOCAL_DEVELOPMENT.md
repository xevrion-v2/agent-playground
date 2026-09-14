# Local Development

Commands documented here match scripts defined on `main` today.

## Prerequisites

- **Node.js:** `>=20` (see root `package.json` `engines.node`)
- **npm:** ships with Node; this repo uses npm workspaces

## Install

From the repository root:

```bash
npm install
```

## Root workspace scripts

Defined in the root `package.json`:

| Script | Command | Purpose |
| --- | --- | --- |
| `dev` | `npm run dev --workspaces --if-present` | Start all workspace dev servers that define `dev` |
| `test` | `npm run test --workspaces --if-present` | Run workspace test scripts |
| `lint` | `npm run lint --workspaces --if-present` | Run workspace lint scripts |
| `format` | `npm run format --workspaces --if-present` | Run workspace format scripts |

## Run individual workspaces

```bash
# API (Express on PORT or 4000)
npm run dev -w apps/api

# Web (Next.js dev server)
npm run dev -w apps/web
```

## Workspace scripts on `main`

| Workspace | `dev` | `test` | `lint` |
| --- | --- | --- | --- |
| `apps/api` | `tsx src/index.ts` | placeholder echo | placeholder echo |
| `apps/web` | `next dev` | placeholder echo | `next lint` |
| `packages/ui` | — | placeholder echo | placeholder echo |
| `packages/db` | — | — | — |

Do not document scripts that are not present in each workspace `package.json`.
