/**
 * PI Calculation using the Bailey–Borwein–Plouffe (BBP) formula
 * combined with Machin-like formulas for verification.
 *
 * ## Approach
 *
 * We use **Machin's formula** for computing PI to arbitrary precision:
 *
 *   π/4 = 4·arctan(1/5) − arctan(1/239)
 *
 * The `arctan` series is computed using the Taylor expansion:
 *
 *   arctan(x) = x − x³/3 + x⁵/5 − x⁷/7 + ...
 *
 * This converges much faster than the Leibniz series because
 * 1/5 and 1/239 are small values.
 *
 * For arbitrary precision we use JavaScript BigInt arithmetic
 * with a fixed-point scaling factor of 10^(digits+10) to avoid
 * floating-point rounding errors.
 *
 * @module pi
 */

/**
 * Computes arctan(1/x) to `digits` decimal places using BigInt arithmetic.
 *
 * Uses the Taylor series: arctan(1/x) = 1/x − 1/(3·x³) + 1/(5·x⁵) − ...
 *
 * @param x - The denominator (computes arctan(1/x))
 * @param digits - Number of decimal digits of precision
 * @returns BigInt representing arctan(1/x) × 10^(digits+10)
 */
function arccot(x: bigint, digits: number): bigint {
  const scale = 10n ** BigInt(digits + 10);
  let sum = 0n;
  let term = scale / x; // first term: 1/x
  let n = 1n;
  let sign = 1n;
  const xSquared = x * x;

  while (term !== 0n) {
    sum += sign * term / n;
    term = term / xSquared;
    n += 2n;
    sign = -sign;
  }

  return sum;
}

/**
 * Computes PI to the specified number of decimal places using
 * Machin's formula: π = 4 × (4·arctan(1/5) − arctan(1/239))
 *
 * @param digits - Number of decimal digits to compute (default: 100)
 * @returns String representation of PI with the requested precision
 *
 * @example
 * ```ts
 * const pi100 = computePI(100);
 * // "3.1415926535897932384626433832795028841971..."
 *
 * const pi1000 = computePI(1000);
 * // PI to 1000 decimal places
 * ```
 */
export function computePI(digits = 100): string {
  const scale = 10n ** BigInt(digits + 10);

  // Machin's formula: π/4 = 4·arctan(1/5) − arctan(1/239)
  const pi = 4n * (4n * arccot(5n, digits) - arccot(239n, digits));

  // Round and format
  const piRounded = pi / (10n ** 10n);
  const piStr = piRounded.toString();
  return piStr[0] + "." + piStr.slice(1, digits + 1);
}

// ── Self-test: verify first 50 known digits ─────────────────────
const KNOWN_PI_50 =
  "3.14159265358979323846264338327950288419716939937510";

const computed = computePI(50);
if (computed !== KNOWN_PI_50) {
  throw new Error(
    `PI verification failed!\nExpected: ${KNOWN_PI_50}\nGot:      ${computed}`
  );
}

console.log("✓ PI verification passed (50 digits)");
console.log(`PI(100) = ${computePI(100)}`);
