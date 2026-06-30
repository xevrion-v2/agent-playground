// High-precision PI calculation using Machin's formula with BigInt arithmetic
// Implements #14 - Bounty from xevrion-v2/agent-playground

/**
 * Calculate PI to the specified number of decimal places using Machin's formula:
 *   π/4 = 4·arctan(1/5) - arctan(1/239)
 *
 * Uses BigInt fixed-point arithmetic to achieve arbitrary precision.
 *
 * arctan(1/k) Taylor series:
 *   arctan(1/k) = 1/k - 1/(3·k³) + 1/(5·k⁵) - 1/(7·k⁷) + ...
 *
 * Term recurrence: term(0) = 1/k; term(n+1) = -term(n) · (2n+1) / ((2n+3) · k²)
 *
 * @param {number} decimals - Number of decimal places (1-100). Must be a positive integer.
 * @returns {string} PI formatted to the specified decimal places (e.g. "3.14159").
 * @throws {Error} If decimals is not a positive integer or exceeds 100.
 */
function calculatePI(decimals) {
  if (typeof decimals !== 'number' || !Number.isInteger(decimals) || decimals < 1) {
    throw new Error('decimals must be a positive integer');
  }
  if (decimals > 100) {
    throw new Error('decimals must not exceed 100');
  }

  // Work with extra guard digits for rounding accuracy
  const precision = decimals + 10;
  // Scale factor: we need enough integer digits to hold π * 10^precision
  // π ≈ 3.14, so we need precision+1 integer digits
  const SCALE = 10n ** BigInt(precision + 2);

  /**
   * Compute arctan(1/k) scaled by SCALE using the Taylor series.
   * @param {number} k - positive integer
   * @returns {bigint} SCALE * arctan(1/k)
   */
  function arctanInv(k) {
    const kBig = BigInt(k);
    const kSquared = kBig * kBig;

    // term(0) = 1/k (scaled)
    let term = SCALE / kBig;
    let sum = term;
    let n = 0n; // current term index

    while (term !== 0n) {
      // term(n+1) = term(n) * (-1) * (2n+1) / ((2n+3) * k²)
      const numerator = 2n * n + 1n;
      const denominator = (2n * n + 3n) * kSquared;

      term = -term * numerator / denominator;

      if (term === 0n) break;
      sum = sum + term;
      n += 1n;
    }

    return sum;
  }

  // Machin's formula: π = 16·arctan(1/5) - 4·arctan(1/239)
  const arctan5 = arctanInv(5);
  const arctan239 = arctanInv(239);

  // piScaled = SCALE * (16·arctan(1/5) - 4·arctan(1/239)) = SCALE * π
  let piScaled = 16n * arctan5 - 4n * arctan239;

  // piScaled = π * 10^(precision+2) where precision = decimals + 10
  // Step 1: shrink to π * 10^(decimals + 1) — one extra decimal for rounding
  const digitsToDrop1 = (precision + 2) - (decimals + 1); // = 11
  const divisor1 = 10n ** BigInt(digitsToDrop1);
  const piWithExtra1 = piScaled / divisor1;

  // Step 2: use the last digit (decimals+1th decimal) to round half-up
  const finalDigit = piWithExtra1 % 10n;
  let piFinal = piWithExtra1 / 10n;
  if (finalDigit >= 5n) {
    piFinal += 1n;
  }

  // Format: insert decimal point after the first digit (3)
  const piStr = piFinal.toString();

  if (piStr.length <= decimals) {
    return '3.' + piStr.padStart(decimals, '0');
  }

  const intPart = piStr.slice(0, piStr.length - decimals);
  const fracPart = piStr.slice(piStr.length - decimals);
  return intPart + '.' + fracPart;
}

module.exports = { calculatePI };
