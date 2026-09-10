# TaskFlow UI Package (`@taskflow/ui`)

Shared UI components for the TaskFlow monorepo.

## Current exports

`src/index.ts` exports a lightweight `Button` stub:

- `Button({ label, disabled? })` — returns a plain object describing a button (`type`, `label`, `disabled`)

This is a placeholder component surface until real React UI primitives are added.

## Scripts

From the repository root:

```bash
npm run test -w packages/ui
npm run lint -w packages/ui
```

Package scripts defined in `package.json`:

| Script | Command | Notes |
| --- | --- | --- |
| `test` | `echo "No UI tests configured yet"` | Placeholder until UI tests are added |
| `lint` | `echo "No UI lint configured yet"` | Placeholder until lint is configured |

Do not document scripts that are not present in `packages/ui/package.json`.
