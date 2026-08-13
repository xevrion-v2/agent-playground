# PI Calculation Challenge

This challenge approximates PI using the Nilakantha series.

## Why this approach

The Nilakantha series is lightweight, easy to implement, and improves accuracy faster than the Leibniz series while still being approachable as a small algorithm exercise.

```text
PI = 3 + 4/(2*3*4) - 4/(4*5*6) + 4/(6*7*8) - ...
```

## Run

From the repository root:

```bash
npm run pi
```

Or provide a custom iteration count:

```bash
node apps/pi-challenge/index.js 10000
```

Higher iteration counts generally produce a more accurate result.
