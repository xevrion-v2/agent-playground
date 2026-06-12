# Implementation for #637

See issue #637 for details.

/bounty $50

References #33.

## Problem

`apps/api/package.json` marks the API workspace as ESM with `"type": "module"`, but `apps/api/src/index.ts` imports the users router without an explicit extension:

```ts
import usersRouter from "./routes/users";
```

When the API entrypoint is type-checked with NodeNext ESM resolution, TypeScript rejects the import:

```text
src/index.ts(3,25): error TS2835: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResoluti