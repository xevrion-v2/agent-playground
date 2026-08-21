/**
 * Machin's formula (1706) in fixed-point bigint arithmetic.
 *
 *   pi/4 = 4 * arctan(1/5) - arctan(1/239)
 *
 * with arctan(1/x) evaluated by its Taylor series
 *
 *   arctan(1/x) = SUM_{n=0..inf} (-1)^n / ((2n + 1) * x^(2n+1))
 *
 * All values are scaled integers: v represents the real number v / 10^prec.
 *
 * This engine is deliberately DIFFERENT from Chudnovsky in every respect —
 * different discoverer, century, series, and convergence behaviour — so an
 * exact digit-for-digit match between the two is a meaningful independent
 * check, not a re-run of the same computation.
 */

import { pow10 } from "./bigmath.js";

/** Fixed-point arctan(1/x): returns floor-ish arctan(1/x) * 10^precision. */
function arctanReciprocal(x: bigint, precision: number): bigint {
  const scale = pow10(precision);
  const x2 = x * x;
  let term = scale / x; // x^-(2n+1) * scale, starting at n = 0
  let sum = 0n;
  let n = 0n;
  while (term !== 0n) {
    sum += n % 2n === 0n ? term / (2n * n + 1n) : -(term / (2n * n + 1n));
    term /= x2;
    n += 1n;
  }
  return sum;
}

/**
 * Compute pi * 10^precision (to within a few units in the last place) via
 * Machin's formula. Callers must treat trailing digits as noisy and keep a
 * guard band — exactly as with any fixed-point series evaluation.
 */
export function machinPiScaled(precision: number): bigint {
  if (!Number.isInteger(precision) || precision < 0) {
    throw new RangeError("precision must be a non-negative integer");
  }
  // Work with extra internal guard digits so per-term floor-division error
  // (< 1 ulp per term, ~precision/1.39 terms) cannot reach the result.
  const guard = 10 + Math.ceil(Math.log10(Math.max(precision, 10)));
  const p = precision + guard;
  const pi = 4n * (4n * arctanReciprocal(5n, p) - arctanReciprocal(239n, p));
  return pi / pow10(guard);
}
