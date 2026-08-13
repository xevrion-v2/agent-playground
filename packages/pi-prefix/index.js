/**
 * @taskflow/pi-prefix
 *
 * Computes exact finite decimal prefixes of PI using BigInt integer arithmetic.
 * PI is an irrational number — it has no final decimal point. This module
 * computes the first N decimal digits on demand via the Machin formula:
 *   PI/4 = 4*arctan(1/5) - arctan(1/239)
 * using BigInt-based Taylor series.
 */

/**
 * Compute arctan(1/x) to `prec` decimal digits using a Taylor series
 * with BigInt arithmetic.
 *
 * @param {bigint} x - The reciprocal argument denominator (arctan(1/x)).
 * @param {number} prec - Number of decimal digits to compute.
 * @returns {bigint} arctan(1/x) * 10^prec as an integer.
 */
function arctanReciprocal(x, prec) {
  const power = 10n ** BigInt(prec + 5); // extra guard digits
  let sum = power / x;
  let term = power / x;
  const xSq = x * x;
  let sign = 1n;

  for (let k = 1; k < prec * 3; k++) {
    term = term / xSq;
    const next = term / BigInt(2 * k + 1);
    if (next === 0n) break;
    if (sign > 0n) {
      sum -= next;
    } else {
      sum += next;
    }
    sign = -sign;
  }
  return sum;
}

/**
 * Return the first `decimals` digits of PI as a string.
 *
 * PI is irrational so there is no "complete" representation — this function
 * returns an exact prefix of the decimal expansion.
 *
 * @param {number} decimals - How many decimal digits to return (0 or more).
 * @returns {string} The digits of PI prefixed with "3." (e.g. "3.14" for decimals=2).
 * @throws {Error} If decimals is negative.
 */
export function piPrefix(decimals) {
  if (!Number.isInteger(decimals) || decimals < 0) {
    throw new Error("decimals must be a non-negative integer");
  }
  if (decimals === 0) return "3";

  // Machin: PI/4 = 4*atan(1/5) - atan(1/239)
  const guard = 10; // guard digits to avoid rounding issues
  const total = decimals + guard;
  const a = arctanReciprocal(5n, total);
  const b = arctanReciprocal(239n, total);
  const piQuotient = (4n * a - b) * 4n; // PI * 10^total

  // Extract the requested number of decimal digits
  const piStr = piQuotient.toString();
  const intPart = piStr[0]; // "3"
  const fracPart = piStr.slice(1, 1 + decimals);
  return `${intPart}.${fracPart}`;
}
