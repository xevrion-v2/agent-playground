# TaskFlow API

Express API service for the TaskFlow workspace.

## Local Commands

Run commands from the repository root with the API workspace selected:

```sh
npm run dev -w apps/api
npm run test -w apps/api
npm run lint -w apps/api
```

The development server uses `PORT` when provided and defaults to port `4000`.

## Local Endpoints

### `GET /health`

Returns a simple service health response:

```json
{
  "status": "ok",
  "service": "taskflow-api"
}
```

### `GET /users`

Returns the current user listing stub:

```json
{
  "data": [],
  "message": "User listing is not implemented yet."
}
```

### `POST /users`

Returns a user creation stub with a fixed `id` and the submitted JSON body fields echoed into `data`:

```json
{
  "data": {
    "id": "stub-user-id"
  },
  "message": "User creation is not implemented yet."
}
```

The route currently documents the stub behavior only; it does not validate or persist users.
