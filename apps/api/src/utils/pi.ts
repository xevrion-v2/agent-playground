/**
 * Calculate π using the Nilakantha series.
 *
 *   π = 3 + 4/(2*3*4) - 4/(4*5*6) + 4/(6*7*8) - ...
 *
 * Converges much faster than the Leibniz series (~1 correct digit
 * per 2 terms vs. ~1 correct digit per 5 terms).
 *
 * @param terms - Number of series terms to evaluate (default: 100_000)
 * @returns π approximation to ~15 decimal places
 */
export function calculatePi(terms = 100_000): number {
  let pi = 3.0;
  let sign = 1.0;

  for (let i = 2; i < terms * 2; i += 2) {
    pi += (sign * 4.0) / (i * (i + 1) * (i + 2));
    sign = -sign;
  }

  return pi;
}

/**
 * Calculate π using the Machin-like formula.
 *
 *   π/4 = 4*arctan(1/5) - arctan(1/239)
 *
 * Uses Taylor series for arctan. Fast convergence with few terms.
 *
 * @param terms - Terms in each arctan expansion (default: 50)
 * @returns π approximation to ~15 decimal places
 */
export function calculatePiMachin(terms = 50): number {
  function arctan(x: number, n: number): number {
    let sum = 0.0;
    let xPow = x;
    for (let i = 1; i <= n; i++) {
      const term = xPow / (2 * i - 1);
      sum += i % 2 === 1 ? term : -term;
      xPow *= x * x;
    }
    return sum;
  }

  return 4.0 * (4.0 * arctan(1.0 / 5.0, terms) - arctan(1.0 / 239.0, terms));
}

if (require.main === module) {
  console.log(`Nilakantha (100k terms): ${calculatePi()}`);
  console.log(`Machin     (50 terms):   ${calculatePiMachin()}`);
  console.log(`Math.PI   (reference): ${Math.PI}`);
}
