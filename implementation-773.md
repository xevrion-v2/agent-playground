# Implementation for #773

See issue #773 for details.

/bounty $50

References #33.

## Problem

The README's Frontend and Backend sections describe many pages and routes that do not exist in the current repository.

Current code evidence:

- `apps/web/src/app/page.tsx` is the only web app route under `apps/web/src/app`.
- `apps/api/src/index.ts` exposes `/health` and mounts `usersRouter` at `/users`.
- `apps/api/src/routes/users.ts` only implements `GET /users` and `POST /users` stubs.

But the README claims the web app includes task boards, user p