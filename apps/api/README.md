# TaskFlow API (`@taskflow/api`)

Express stub service for local TaskFlow development.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start the API with `tsx` on port `4000` (or `PORT`) |
| `npm run typecheck` | Type-check `src/**/*.ts` when `tsconfig.json` is present |
| `npm test` | Placeholder — no automated tests configured yet |
| `npm run lint` | Placeholder — no lint configured yet |

## Local endpoints

| Method | Path | Behavior |
|--------|------|----------|
| `GET` | `/health` | Returns `{ "status": "ok", "service": "taskflow-api" }` |
| `GET` | `/users` | Returns an empty user list stub |
| `POST` | `/users` | Returns `201` with a stub user object echoing the JSON body |

## Source layout

- `src/index.ts` — Express app entry point
- `src/routes/users.ts` — `/users` router stub

## Quick start

```bash
cd apps/api
npm install
npm run dev
curl -s http://localhost:4000/health
curl -s http://localhost:4000/users
```
