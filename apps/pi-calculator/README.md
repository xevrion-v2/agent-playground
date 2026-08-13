# PI Calculator

A lightweight script that estimates the value of PI using the **Monte Carlo** method.

## Method

1. Generate random points in a 2×2 square centered at (0,0).
2. Count points that fall inside the unit circle (x² + y² ≤ 1).
3. The ratio (inside / total) approximates π/4.
4. Multiply by 4 to obtain the PI estimate.

More points yield a more accurate result.

## Usage

```bash
# Run with default 1,000,000 points
npm run start

# Run with custom number of points
npm run start:1m
npm run start:10m

# Or directly with tsx
npx tsx src/calculatePi.ts 5000000
```

## Accuracy Example

| Points | Estimated PI | Error |
|--------|--------------|-------|
| 1,000  | ≈3.16        | ~0.02 |
| 1,000,000 | ≈3.1415   | ~0.0001 |
| 10,000,000 | ≈3.14159 | ~0.000003 |

## Related Issue

This implementation addresses **[Issue #14](https://github.com/xevrion-v2/agent-playground/issues/14)** — Improve PI calculation accuracy.
