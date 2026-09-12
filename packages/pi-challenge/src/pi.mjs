/**
 * PI calculation challenge for the TaskFlow engineering playground.
 *
 * Algorithm: Machin's formula (1706)
 *
 *   pi = 16 * arctan(1/5) - 4 * arctan(1/239)
 *
 * arctan(1/x) is evaluated with its Taylor series:
 *
 *   arctan(1/x) = sum over k >= 0 of (-1)^k / ((2k + 1) * x^(2k + 1))
 *
 * Why Machin: the series for x = 5 and x = 239 converge fast (terms shrink
 * by factors of 25 and 57121 respectively), so ~150 terms give well over
 * 100 correct decimal digits. All arithmetic uses BigInt fixed-point math,
 * so the result is exact (deterministic integer truncation, no floating
 * point rounding) and runs anywhere Node.js >= 20 runs, with zero
 * dependencies.
 *
 * Honesty note (required by the challenge): pi is irrational, so a "last
 * decimal digit" does not exist. This module computes pi exactly truncated
 * to any requested finite precision; see README.md for the full discussion.
 */

/**
 * Computes floor(arctan(1/x) * scale) exactly using integer arithmetic.
 *
 * @param {bigint} x     - denominator of the arctan argument (1/x)
 * @param {bigint} scale - fixed-point scale factor (10^(digits + guard))
 * @returns {bigint} arctan(1/x) multiplied by scale, truncated toward zero
 */
function arctanInverseScaled(x, scale) {
  const xSquared = x * x;
  let xPower = x; // x^(2k + 1)
  let k = 0n;
  let sum = 0n;

  for (;;) {
    const term = scale / (xPower * (2n * k + 1n));
    if (term === 0n) break; // series tail can no longer affect the result
    sum += k % 2n === 0n ? term : -term;
    xPower *= xSquared;
    k += 1n;
  }

  return sum;
}

/**
 * Computes pi truncated to exactly `digits` decimal places.
 *
 * @param {number} digits - number of decimal places (positive integer)
 * @returns {string} pi as a string, e.g. "3.14159..." with `digits` decimals
 */
export function computePi(digits) {
  if (!Number.isInteger(digits) || digits < 1) {
    throw new RangeError("digits must be a positive integer");
  }

  // Guard digits absorb truncation error accumulated across the two series.
  const guard = 10;
  const scale = 10n ** BigInt(digits + guard);

  const piScaled =
    16n * arctanInverseScaled(5n, scale) - 4n * arctanInverseScaled(239n, scale);

  const piTruncated = piScaled / 10n ** BigInt(guard);
  const text = piTruncated.toString().padStart(digits + 1, "0");
  return `${text.slice(0, 1)}.${text.slice(1)}`;
}

// Allow `node src/pi.mjs [digits]` for quick local runs.
if (import.meta.url === `file://${process.argv[1]}`) {
  const digits = Number(process.argv[2] ?? 100);
  console.log(computePi(digits));
}
