# PI Calculation Challenge

## Overview

This challenge computes an approximation of π using the **Monte Carlo method**. This approach is chosen for its simplicity, visual intuition, and the ability to demonstrate trade-offs between computation time and accuracy.

## Algorithm Description

1. Generate N random points uniformly in a 2×2 square centered at the origin (or equivalently, in a 1×1 square in the first quadrant).
2. Count how many points fall within the unit circle (distance from origin ≤ 1).
3. The ratio (inside points / total points) approximates the area of the quarter circle, which is π/4.
4. Multiply by 4 to get π.

## Why Monte Carlo?

Monte Carlo simulation is a well-known statistical method that is easy to implement and parallelize. It provides a clear illustration of the law of large numbers and can be incrementally improved by increasing the number of samples. For a lightweight challenge, this method is ideal.

## Usage

```bash
# Run with default 10 million points
npx tsx pi/pi.ts

# Run with custom number of points
npx tsx pi/pi.ts 1000000
```

## Example Output

```
Starting Monte Carlo π calculation with 10,000,000 points...
Points: 10000000
Inside circle: 7853479
Estimated π: 3.1413916
Difference from actual π: 0.00020105358979323846
Calculation took 2.34 seconds.
```

## Notes

- Accuracy ≈ sqrt(N) / N, so to improve by a factor of 10, you need 100× more points.
- The script uses JavaScript's `Math.random()`; for higher-quality randomness, consider `crypto.randomBytes()`.

## Related Resources

- [Monte Carlo method for π](https://en.wikipedia.org/wiki/Monte_Carlo_method)
- [Buffon's needle problem](https://en.wikipedia.org/wiki/Buffon%27s_needle_problem) (alternative method)
