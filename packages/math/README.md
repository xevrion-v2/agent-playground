# TaskFlow PI Playground

This package documents why calculating PI to its "last decimal" is impossible and provides a high-precision estimator for engineering demos.

## Why exact PI is unreachable

PI is an irrational and transcendental number. It has no terminating decimal expansion, so no finite algorithm can return the final digit. Issue #17 describes an open-ended challenge; this implementation clarifies that limit while improving practical precision.

## Usage

```bash
npm run test -w packages/math
```

```ts
import { estimatePiDigits } from "@taskflow/math";

console.log(estimatePiDigits(50));
```

## Algorithm

- `estimatePi` — classic Leibniz series for quick smoke tests.
- `estimatePiDigits` — Chudnovsky series for higher precision demo output (up to 100 requested digits, 15 significant decimal places in JS number output).

Reference the Bug Bounty Program in issue #33 when extending this challenge.
