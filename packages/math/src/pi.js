/**
 * Estimate PI with the Nilakantha series.
 *
 * The series starts at 3 and alternates fractions:
 *   3 + 4/(2*3*4) - 4/(4*5*6) + 4/(6*7*8) ...
 *
 * It is slower than production-grade algorithms such as Chudnovsky, but it is
 * compact, dependency-free, and useful as a readable algorithm challenge.
 *
 * @param {number} terms number of Nilakantha correction terms to apply
 * @returns {number} PI estimate
 */
export function estimatePi(terms = 1000) {
  if (!Number.isInteger(terms) || terms < 0) {
    throw new RangeError("terms must be a non-negative integer");
  }

  let estimate = 3;
  let sign = 1;

  for (let index = 0; index < terms; index += 1) {
    const first = 2 + index * 2;
    estimate += sign * (4 / (first * (first + 1) * (first + 2)));
    sign *= -1;
  }

  return estimate;
}

/**
 * Return a fixed-width decimal string for an estimated PI value.
 *
 * @param {number} terms number of Nilakantha correction terms to apply
 * @param {number} digits digits after the decimal point
 * @returns {string} formatted PI estimate
 */
export function formatPiEstimate(terms = 1000, digits = 10) {
  if (!Number.isInteger(digits) || digits < 0 || digits > 100) {
    throw new RangeError("digits must be an integer between 0 and 100");
  }

  return estimatePi(terms).toFixed(digits);
}
