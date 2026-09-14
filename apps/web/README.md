# TaskFlow Web App (`@taskflow/web`)

Next.js 14 App Router frontend for the TaskFlow monorepo.

## Current entry point

The web app currently exposes a single route:

- `src/app/page.tsx` — landing page with the TaskFlow title and intro copy

There are no additional routes under `apps/web/src/app` on `main` today.

## Scripts

From the repository root:

```bash
npm run dev -w apps/web
npm run test -w apps/web
npm run lint -w apps/web
```

Package scripts defined in `package.json`:

| Script | Command | Notes |
| --- | --- | --- |
| `dev` | `next dev` | Starts the local Next.js dev server |
| `test` | `echo "No web tests configured yet"` | Placeholder until web tests are added |
| `lint` | `next lint` | Runs Next.js ESLint |

Do not document scripts that are not present in `apps/web/package.json`.
