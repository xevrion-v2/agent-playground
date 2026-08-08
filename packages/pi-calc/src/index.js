#!/usr/bin/env node
/**
 * pi-calc — Exact π calculation using the Machin-like formula with BigInt.
 *
 * Why a Machin-like formula instead of Chudnovsky:
 * Chudnovsky is faster asymptotically but requires complex binary splitting.
 * A simpler Machin-like formula (π/4 = 4 arctan(1/5) - arctan(1/239)) is
 * easier to verify and still converges rapidly (~1.4 digits per term).
 *
 * This implementation uses the Taylor series for arctan:
 *   arctan(x) = x - x³/3 + x⁵/5 - x⁷/7 + ...
 *
 * Combined with the identity:
 *   π/4 = 4 arctan(1/5) - arctan(1/239)
 *
 * All arithmetic is done with JavaScript BigInt for exact integer operations
 * using a fixed scaling factor to represent fractions.
 *
 * "Exact" π means to any finite number of decimal digits the caller requests.
 * π is transcendental (Lindemann 1882), so it has no finite decimal
 * representation — this computes as many digits as memory allows.
 */

const BigInt = globalThis.BigInt;

/**
 * Calculate π to the specified number of decimal digits using
 * the Machin-like formula with BigInt arithmetic.
 *
 * π/4 = 4 * arctan(1/5) - arctan(1/239)
 *
 * @param {number} digits — number of decimal digits to compute (>= 1)
 * @returns {string} π as "3.1415..."
 */
function calculatePi(digits) {
  if (digits < 1) throw new RangeError("digits must be >= 1");

  // Working precision: extra guard digits for rounding
  const prec = BigInt(digits + 10);
  const ONE = 10n ** prec;

  /**
   * Compute arctan(1/x) * ONE using the Taylor series:
   *   arctan(1/x) = 1/x - 1/(3x³) + 1/(5x⁵) - 1/(7x⁷) + ...
   *
   * We sum terms until the term contribution is less than 1 (in the
   * scaled integer representation), meaning further terms only affect
   * decimal places beyond our precision.
   *
   * @param {bigint} x — the denominator of the arctan argument
   * @param {bigint} one — the scaling factor (10^prec)
   * @returns {bigint} arctan(1/x) * one
   */
  function arctan(x, one) {
    // scaled = one / x  — first term of the series
    let total = one / x;
    // xSquared = x² — we multiply the denominator by x² each iteration
    const xSquared = x * x;
    // term = first term
    let term = total;
    // sign = -1 for next term (alternating series)
    let sign = -1n;
    // denominator = 3 (starts at 3, goes up by 2 each term)
    let denom = 3n;
    // xPower = x (we'll multiply by xSquared each iteration)
    let xPower = x;

    while (term > 0n) {
      // term = previous term / (x²) * (denom_prev / denom_curr)
      // Actually: term_k = ONE / ((2k+1) * x^(2k+1))
      // term_k = term_{k-1} * x²_prev / (x² * (2k+1) / (2k-1))
      // Simpler: just recompute each time to avoid overflow issues

      xPower *= xSquared;
      term = one / (denom * xPower);

      if (term === 0n) break;

      total += sign * term;
      sign = -sign;
      denom += 2n;
    }

    return total;
  }

  // Compute π/4 * ONE = 4 * arctan(1/5) - arctan(1/239)
  const arctan5 = arctan(5n, ONE);
  const arctan239 = arctan(239n, ONE);
  const piOver4 = 4n * arctan5 - arctan239;

  // π * ONE = 4 * piOver4
  const piScaled = 4n * piOver4;

  // Convert to decimal string
  const piStr = piScaled.toString();

  // The last `prec` digits are the fractional part.
  // piScaled = <integer_part> * 10^prec + <fractional_part>
  // For π, integer part is 3, fractional has (digits + 10) digits.
  // We remove the 10 guard digits.
  const intPart = piStr.slice(0, piStr.length - Number(prec));
  let fracPart = piStr.slice(-Number(prec));

  // Remove guard digits and truncate to requested digits
  const guardDigits = 10;
  fracPart = fracPart.slice(0, digits);

  return (intPart || "3") + "." + fracPart.padStart(digits, "0");
}

/**
 * Known first 100 decimal digits of π.
 * Source: NIST, OEIS A000796
 */
const PI_100 = "3.1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679";

/**
 * Verify π against a known reference string.
 */
function verifyPi(pi, reference) {
  return pi === reference;
}

module.exports = { calculatePi, verifyPi, PI_100 };
