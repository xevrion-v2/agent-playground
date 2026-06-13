# Implementation for #655

See issue #655 for details.

## Bug

`npm run lint -w apps/web` is not safe for CI or agent runs because the web workspace has a `next lint` script but no ESLint configuration or ESLint dependencies. Running the script enters Next.js' interactive setup wizard:

```text
? How would you like to configure ESLint?
  Strict (recommended)
  Base
  Cancel
```

In a non-interactive process this exits with a failure instead of producing deterministic lint output.

## Expected

The web lint command should run non-interactively and ei