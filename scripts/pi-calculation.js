#!/usr/bin/env node

/**
 * Compute a lightweight approximation of PI using the Nilakantha series.
 *
 * The algorithm starts from 3 and then applies alternating terms:
 *
 *   π ≈ 3 + Σ((-1)^n * 4 / ((2n + 2)(2n + 3)(2n + 4)))
 *
 * This series converges quickly enough for small to medium precision needs
 * and is deterministic for a fixed number of terms.
 *
 * @param {number} termCount Number of series terms to evaluate.
 * @returns {number} Pi approximation with the requested number of terms.
 */
function calculatePiByNilakantha(termCount = 20) {
  if (!Number.isInteger(termCount) || termCount < 0) {
    throw new TypeError("termCount must be a non-negative integer");
  }

  let pi = 3;
  let sign = 1;

  for (let i = 0; i < termCount; i++) {
    const a = 2 * i + 2;
    const b = a + 1;
    const c = a + 2;
    pi += sign * (4 / (a * b * c));
    sign *= -1;
  }

  return pi;
}

/**
 * Return π rounded to a specific decimal digit count via the Nilakantha method.
 *
 * @param {Object} opts
 * @param {number} opts.termCount Number of terms used by the approximation.
 * @param {number} opts.digits Number of digits to keep after the decimal.
 * @returns {string} Formatted PI string.
 */
function calculatePiWithDigits({ termCount = 20, digits = 10 } = {}) {
  if (!Number.isInteger(digits) || digits < 0) {
    throw new TypeError("digits must be a non-negative integer");
  }

  const estimate = calculatePiByNilakantha(termCount);
  return estimate.toFixed(digits);
}

module.exports = {
  calculatePiByNilakantha,
  calculatePiWithDigits,
};
