/**
 * Chudnovsky algorithm for computing π to arbitrary precision.
 *
 * The Chudnovsky series:
 *
 *   π = C^(3/2) / (12 * S)
 *
 * where:
 *   S = Σ_{k=0}^{∞} (-1)^k * (6k)! * (A + Bk) / ((3k)! * (k!)³ * C^{3k})
 *   A = 13591409,  B = 545140134,  C = 640320
 *
 * Simplified: π = 426880 * √10005 / S
 *
 * Reference: https://en.wikipedia.org/wiki/Chudnovsky_algorithm
 */

/**
 * Compute π to the given number of correct decimal digits.
 *
 * @param digits  Number of decimal places required (default 100).
 * @returns       π as "3.d₁d₂...d_{digits}".
 */
export function computePi(digits: number = 100): string {
  if (digits < 1) throw new Error("digits must be >= 1");

  // ── Precision ──────────────────────────────────────────────────
  // Each decimal digit needs log₂(10) ≈ 3.322 bits.  Add guard bits.
  const bits = BigInt(Math.ceil(digits * 3.322 + 30));
  const ONE = 1n << bits; // fixed-point "1"

  // ── Constants ──────────────────────────────────────────────────
  const A = 13591409n;
  const B = 545140134n;
  const C = 640320n;
  const C3 = C * C * C; // 640320³

  // ── Series ─────────────────────────────────────────────────────
  // t_k = (-1)^k * (6k)! * (A + Bk) / ((3k)! * (k!)³ * C^{3k})
  // t_0 = A (all factorial terms = 1, C^{0} = 1)
  // Sum S = Σ t_k

  let sum = 0n;
  let term = A * ONE; // t_0 = A, scaled by ONE

  for (let k = 0; ; k++) {
    sum += term;

    // Recurrence: t_{k+1} = t_k * (-1) * P/Q
    // where:
    //   P = (6k+1)(6k+2)(6k+3)(6k+4)(6k+5)(6k+6) * (A + B(k+1))
    //   Q = (3k+1)(3k+2)(3k+3) * (k+1)³ * C³ * (A + Bk)

    const kk = BigInt(k);
    const k1 = kk + 1n;

    const num = (6n * kk + 1n) * (6n * kk + 2n) * (6n * kk + 3n) *
                (6n * kk + 4n) * (6n * kk + 5n) * (6n * kk + 6n) *
                (A + B * k1);

    const den = (3n * kk + 1n) * (3n * kk + 2n) * (3n * kk + 3n) *
                k1 * k1 * k1 * C3 *
                (A + B * kk);

    term = -term * num / den;

    if (term === 0n) break;
  }

  // ── Final division ──────────────────────────────────────────────
  // π = 426880 * √10005 * ONE / sum
  const sqrt10005 = bigIntSqrt(10005n, bits);
  const piScaled = 426880n * sqrt10005 * ONE / sum;

  // ── Convert to decimal ──────────────────────────────────────────
  const piStr = fixedPointToDecimal(piScaled, bits);

  // Truncate (floor) to requested digits
  return truncateTo(piStr, digits);
}

// ── Helpers ──────────────────────────────────────────────────────────

/**
 * Fixed-point square root via Newton's method.
 *
 * Returns floor(sqrt(n) * 2^bits).
 *
 * We compute target = n * 2^(2*bits)  then sqrt(target) = sqrt(n) * 2^bits.
 */
function bigIntSqrt(n: bigint, bits: bigint): bigint {
  // target = n * 2^(2*bits)
  const target = n << (2n * bits);
  // Initial guess
  let x = target >> bits;
  if (x === 0n) x = target;
  let prev = 0n;
  while (x !== prev) {
    prev = x;
    x = (x + target / x) >> 1n;
  }
  return x;
}

/**
 * Convert a fixed-point BigInt (value / 2^bits) to a decimal string.
 */
function fixedPointToDecimal(value: bigint, bits: bigint): string {
  const TEN = 10n;
  const ONE = 1n << bits;

  const intPart = value / ONE;
  let remainder = value % ONE;

  let intStr = intPart.toString();
  if (remainder === 0n) return intStr + ".0";

  // Extract enough decimal digits for full precision
  const maxDigits = Number(bits) * 3 / 10 + 20;
  let frac = "";
  for (let i = 0; i < maxDigits; i++) {
    remainder *= TEN;
    frac += (remainder / ONE).toString();
    remainder %= ONE;
    if (remainder === 0n) break;
  }

  return intStr + "." + frac;
}

/**
 * Truncate (floor) a decimal string to the given number of fractional digits.
 */
function truncateTo(numStr: string, digits: number): string {
  const dotIdx = numStr.indexOf(".");
  if (dotIdx === -1) return numStr + "." + "0".repeat(digits);

  const frac = numStr.slice(dotIdx + 1);
  if (frac.length <= digits) {
    return numStr + "0".repeat(digits - frac.length);
  }

  return numStr.slice(0, dotIdx + 1 + digits);
}
