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

function validateDigits(digits) {
  if (!Number.isInteger(digits) || digits < 0) {
    throw new TypeError("digits must be a non-negative integer");
  }
}

function arctanInverse(q, scale) {
  const qBigInt = BigInt(q);
  const qSquared = qBigInt * qBigInt;
  let term = scale / qBigInt;
  let sum = term;
  let denominator = 3n;
  let sign = -1n;

  while (term !== 0n) {
    term /= qSquared;
    const addend = term / denominator;
    if (addend === 0n) {
      break;
    }
    sum += sign * addend;
    sign *= -1n;
    denominator += 2n;
  }

  return sum;
}

function formatScaledPi(scaledPi, digits) {
  if (digits === 0) {
    return String(scaledPi);
  }

  const scale = 10n ** BigInt(digits);
  const integer = scaledPi / scale;
  const fractional = String(scaledPi % scale).padStart(digits, "0");
  return `${integer}.${fractional}`;
}

/**
 * Return PI using Machin's formula and fixed-point BigInt arithmetic.
 *
 *   π = 16 arctan(1/5) - 4 arctan(1/239)
 *
 * Guard digits are carried internally so the final string can be rounded to
 * the requested number of decimal places without relying on floating point.
 *
 * @param {number} digits Number of digits to keep after the decimal.
 * @returns {string} Formatted PI string.
 */
function calculatePiByMachin(digits = 10) {
  validateDigits(digits);

  const guardDigits = 10;
  const guardScale = 10n ** BigInt(guardDigits);
  const workingScale = 10n ** BigInt(digits + guardDigits);
  const pi =
    16n * arctanInverse(5, workingScale) -
    4n * arctanInverse(239, workingScale);
  const roundedPi = (pi + guardScale / 2n) / guardScale;

  return formatScaledPi(roundedPi, digits);
}

/**
 * Return PI rounded to a specific decimal digit count via Machin's formula.
 *
 * @param {Object} opts
 * @param {number} opts.digits Number of digits to keep after the decimal.
 * @returns {string} Formatted PI string.
 */
function calculatePiWithDigits({ digits = 10 } = {}) {
  return calculatePiByMachin(digits);
}

module.exports = {
  calculatePiByMachin,
  calculatePiByNilakantha,
  calculatePiWithDigits,
};
