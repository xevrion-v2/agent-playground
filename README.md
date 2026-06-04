# agent-playground

A simple monorepo for autonomous coding challenges and experiments.

## Structure

- `apps/` – runnable applications
- `packages/` – reusable libraries
- `contributors/` – contributor docs / examples

## Getting Started

```bash
npm install
npm run dev
```

## Math Challenges

### PI calculation challenge

A lightweight algorithm challenge now lives in `apps/pi-challenge`.
It approximates PI using the Nilakantha series:

```text
PI = 3 + 4/(2*3*4) - 4/(4*5*6) + 4/(6*7*8) - ...
```

This approach was chosen because it is still simple to understand, but it converges faster than the more common Leibniz series for a small number of iterations.

Run it with:

```bash
npm run pi
```

You can also pass a custom iteration count:

```bash
node apps/pi-challenge/index.js 10000
```

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for contributor workflow.
