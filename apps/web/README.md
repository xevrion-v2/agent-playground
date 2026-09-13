# TaskFlow Web App

`apps/web` contains the TaskFlow frontend built with Next.js 14 App Router and React 18. It is the browser-facing workspace for task planning, proposal management, dashboards, messaging, notifications, billing, and account settings.

## Workspace Role

- Provides the Next.js application entry points under `src/app`.
- Owns frontend routes, layouts, and page-level UI.
- Consumes shared packages from the monorepo as those packages are expanded.
- Keeps web-specific dependencies and scripts in `apps/web/package.json`.

## Current Structure

```text
apps/web/
├── package.json
└── src/
    └── app/
        └── page.tsx
```

The current landing page is intentionally small and establishes the web workspace. Future route work should stay inside `src/app` unless a shared package is a better fit.

## Scripts

Run these commands from the repository root:

```bash
npm run dev -w apps/web
npm run lint -w apps/web
npm run test -w apps/web
```

The `test` script is currently a placeholder that reports no configured web tests. Add focused frontend tests alongside future web features when behavior becomes testable.

## Development Notes

- Use App Router conventions for new pages and route segments.
- Keep workspace-specific dependencies in this package rather than the repository root when they are only needed by the web app.
- Prefer shared packages for reusable UI or data-access code once those packages provide the needed surface.
- Keep web changes scoped to the issue being addressed so pull requests remain easy to review.
