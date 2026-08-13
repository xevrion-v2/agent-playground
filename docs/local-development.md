# Local development

## Requirements

- **Node.js** >= 20 (see `engines` in root `package.json`)

## Install

```bash
npm install
```

## Root workspace commands

These scripts exist on `main` today:

| Command | What it runs |
|---------|----------------|
| `npm run dev` | `npm run dev --workspaces --if-present` |
| `npm run test` | `npm run test --workspaces --if-present` |
| `npm run lint` | `npm run lint --workspaces --if-present` |
| `npm run format` | `npm run format --workspaces --if-present` |

## Run a single workspace

```bash
npm run dev -w apps/web
npm run dev -w apps/api
```

## Environment

Copy `.env.example` files in `apps/api` and `packages/db` before running services that need configuration.
