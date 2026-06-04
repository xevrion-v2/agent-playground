# PI Calculation Challenge

Estimate **π** using the **Monte Carlo method**.

## Algorithm

1. Randomly generate `(x, y)` in `[0,1] × [0,1]`.
2. Count points inside the quarter-circle (`x² + y² ≤ 1`).
3. `π ≈ 4 × (inside / total)`.

## Run

```bash
npx ts-node pi/pi-challenge.ts [samples]
```

Default: 1,000,000 samples.

## Why Monte Carlo?

It trades precision for simplicity — the algorithm is embarrassingly parallel and requires zero mathematical insight beyond Pythagoras.
