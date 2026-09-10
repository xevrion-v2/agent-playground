# @taskflow/api

Express API service for the TaskFlow monorepo. This package exposes lightweight route stubs for local development and manual testing.

## Local endpoints

| Method | Path | Description |
| --- | --- | --- |
| `GET` | `/health` | Health check. Returns `{ "status": "ok", "service": "taskflow-api" }`. |
| `GET` | `/users` | Stub user listing. Returns an empty `data` array and a not-implemented message. |
| `POST` | `/users` | Stub user creation. Echoes the request body with a placeholder `id` and a not-implemented message. |

Routes are defined in `src/index.ts` (health) and `src/routes/users.ts` (users).

## Environment variables

| Variable | Default | Purpose |
| --- | --- | --- |
| `PORT` | `4000` | HTTP port for the Express server. |

## Scripts

From the repository root:

```bash
npm run dev --workspace @taskflow/api
```

From this package directory:

```bash
npm run dev    # start the API with tsx
npm run test   # placeholder — no API tests configured yet
npm run lint   # placeholder — no API lint configured yet
```

## Notes

- The server starts when `src/index.ts` is executed; there is no separate production build step in this stub.
- User routes are placeholders only — they do not persist data or validate payloads yet.
