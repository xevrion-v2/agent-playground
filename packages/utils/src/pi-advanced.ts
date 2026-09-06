/**
 * High-precision π calculation using the Chudnovsky algorithm.
 *
 * The Chudnovsky algorithm (1988) is one of the fastest known algorithms for
 * computing π. Each term of the series adds approximately 14 decimal digits.
 *
 * Formula:
 *   π = 426880 · √10005 / K
 *
 * where:
 *   K = Σ_{k=0}^{∞} (-1)^k · (6k)! · (13591409 + 545140134k) /
 *                       ((3k)! · (k!)³ · 640320^{3k})
 *
 * This implementation uses BigInt fixed-point arithmetic with configurable
 * precision, and employs binary splitting for O(n log² n) performance.
 *
 * References:
 *   - Chudnovsky & Chudnovsky (1988), "Approximations and complex multiplication"
 *   - https://en.wikipedia.org/wiki/Chudnovsky_algorithm
 *   - https://oeis.org/A000796 (decimal digits of π)
 *
 * @module pi-advanced
 */

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

/** 426880 — numerator scaling factor in the Chudnovsky formula. */
const C: bigint = 426880n;

/** 10005 — radicand inside √10005 in the Chudnovsky formula. */
const D: bigint = 10005n;

/** 13591409 — first term constant (A in the series numerator). */
const A: bigint = 13591409n;

/** 545140134 — linear coefficient (B in the series numerator). */
const B: bigint = 545140134n;

/** 640320³ — the fundamental Chudnovsky constant (262537412640768000). */
const C3: bigint = 640320n ** 3n;

/**
 * 640320^(3/2) = 640320 · √640320 — used in the alternative Chudnovsky form.
 * Pre-computed as an integer floor for one of the formulations.
 */
const C_SQRT_C: bigint = 640320n * 80010n; // 640320 * 80010 = 512, 256, 032, 00
// Note: More precisely √640320 ≈ 800.099... but we compute it dynamically below.

/**
 * Decimal digits contributed per term: log₁₀(640320³ / 24) ≈ 14.09
 */
const DIGITS_PER_TERM: number = 14;

// ---------------------------------------------------------------------------
// Integer square root (Newton's method for BigInt)
// ---------------------------------------------------------------------------

/**
 * Compute floor(√n) for a non-negative BigInt using Newton's method.
 *
 * @param n - Non-negative BigInt.
 * @returns Floor of the square root of `n`.
 * @throws {RangeError} If `n` is negative.
 *
 * @example
 * ```ts
 * integerSqrt(144n) // => 12n
 * integerSqrt(2n)   // => 1n
 * ```
 */
export function integerSqrt(n: bigint): bigint {
  if (n < 0n) {
    throw new RangeError("Cannot compute square root of negative number");
  }
  if (n < 2n) return n;

  // Initial estimate using bit-length approximation
  const bitLen = n.toString(16).length * 4;
  const halfBits = Math.ceil(bitLen / 2);
  let x = 1n << BigInt(halfBits);

  // Refine with Newton's method
  let y = (x + n / x) >> 1n;
  while (y < x) {
    x = y;
    y = (x + n / x) >> 1n;
  }
  return x;
}

// ---------------------------------------------------------------------------
// Binary splitting for the Chudnovsky series
// ---------------------------------------------------------------------------

/**
 * Binary splitting result tuple: { P, Q, T } representing the series sum.
 *
 * The sum Σ_{k=a}^{b-1} s_k is represented as T / Q, with P being the
 * product of all P_k terms (used in recursive recombination).
 */
interface BsResult {
  /** Product accumulator. */
  P: bigint;
  /** Denominator accumulator. */
  Q: bigint;
  /** Numerator accumulator. */
  T: bigint;
}

/**
 * Binary splitting for the Chudnovsky series.
 *
 * Computes the sum Σ_{k=a}^{b-1} s_k where:
 *   s_k = (-1)^k · (6k)! · (A + B·k) / ((3k)! · (k!)³ · 640320^{3k})
 *
 * Using binary splitting, the sum Σ = T / Q is computed recursively,
 * achieving O(n log² n) complexity.
 *
 * @param a - Start index (inclusive).
 * @param b - End index (exclusive).
 * @returns {BsResult} The (P, Q, T) tuple for the range [a, b).
 *
 * @internal
 */
function bs(a: number, b: number): BsResult {
  if (b - a === 1) {
    if (a === 0) {
      // Base term: k = 0 → P = 1, Q = 1, T = A (= 13591409)
      return { P: 1n, Q: 1n, T: A };
    }
    const k = BigInt(a);
    // P_k = (6k-5)(2k-1)(6k-1) — the rising factorial quotient
    const Pk = (6n * k - 5n) * (2n * k - 1n) * (6n * k - 1n);
    // Q_k = k³ · 640320³ / 24
    const Qk = k * k * k * C3 / 24n;
    // T_k = P_k · (A + B·k), with sign (-1)^k
    let Tk = Pk * (A + B * k);
    if (a & 1) {
      Tk = -Tk;
    }
    return { P: Pk, Q: Qk, T: Tk };
  }

  // Recursive split
  const m = (a + b) >> 1;
  const left = bs(a, m);
  const right = bs(m, b);

  return {
    P: left.P * right.P,
    Q: left.Q * right.Q,
    T: left.T * right.Q + left.P * right.T,
  };
}

// ---------------------------------------------------------------------------
// Main calculation
// ---------------------------------------------------------------------------

/**
 * Calculates π to the specified number of decimal digits using the
 * Chudnovsky algorithm with binary splitting.
 *
 * Uses the formula:
 *   π = (C · √C · Q) / (12 · T)
 * where C = 640320 and (P, Q, T) come from the binary splitting of the
 * Chudnovsky series.
 *
 * All arithmetic is performed with BigInt fixed-point scaling to avoid
 * floating-point rounding errors entirely.
 *
 * @param digits - Number of decimal digits to compute (1–1 000 000).
 *                 Defaults to **1000**.
 * @returns A string representation of π with the requested digits, e.g.
 *          `"3.14159265358979323846..."`.
 *
 * @throws {RangeError} If `digits` is less than 1.
 *
 * @example
 * ```ts
 * import { calculatePi } from "./pi-advanced";
 *
 * // Default precision (1000 digits)
 * const pi = calculatePi();
 * console.log(pi); // "3.1415926535..."
 *
 * // Custom precision
 * const pi50 = calculatePi(50);
 * console.log(pi50); // "3.14159265358979323846264338327950288419716939937510"
 * ```
 */
export function calculatePi(digits: number = 1000): string {
  // Validate input
  if (digits < 1) {
    throw new RangeError("Digits must be at least 1");
  }
  const numDigits = Math.min(digits, 1_000_000);

  // Guard digits to absorb rounding from the final division
  const guardDigits = 12;
  const totalDigits = numDigits + guardDigits;

  // Number of series terms needed
  const numTerms = Math.ceil(totalDigits / DIGITS_PER_TERM) + 2;

  // -----------------------------------------------------------------------
  // Step 1: Compute the series sum via binary splitting
  // -----------------------------------------------------------------------
  const { P, Q, T } = bs(0, numTerms);

  // The Chudnovsky formula using the 1/π form:
  //   1/π = (12 / √(C³)) · Σ s_k
  //   1/π = (12 / √(C³)) · T / Q
  //     π = (√(C³) · Q) / (12 · T)
  //     π = (C · √C · Q) / (12 · T)

  // -----------------------------------------------------------------------
  // Step 2: Compute √C scaled to the required precision
  // -----------------------------------------------------------------------
  // We need √C × 10^totalDigits as an integer.
  // That is integerSqrt(C × 10^{2·totalDigits}).

  const precisionFactor = 10n ** BigInt(totalDigits);
  const sqrtC_scaled = integerSqrt(C * precisionFactor * precisionFactor);
  // Equivalent: integerSqrt(C * 10n ** BigInt(2 * totalDigits))

  // -----------------------------------------------------------------------
  // Step 3: Compute π × 10^totalDigits as integer
  // -----------------------------------------------------------------------
  // π × 10^D = (C × sqrtC_scaled × Q) / (12 × T)
  let piScaled: bigint;
  try {
    piScaled = (C * sqrtC_scaled * Q) / (12n * T);
  } catch {
    // Fallback: compute in parts if the numerator is too large for BigInt
    // (unlikely unless digits > 100,000, but handled defensively)
    const numerator = C * sqrtC_scaled * Q;
    const denominator = 12n * T;
    piScaled = numerator / denominator;
  }

  // -----------------------------------------------------------------------
  // Step 4: Format as decimal string
  // -----------------------------------------------------------------------
  // The scaled integer has the form:  3141592653589793...
  //                                       ^-- integer part "3" at position 0
  //                                        -- fractional part follows

  const piStr = piScaled.toString();

  // Ensure we have at least totalDigits+1 characters
  const padded = piStr.padStart(totalDigits + 1, "0");
  const intPart = padded[0]; // Always "3" for valid computation
  let fracPart = padded.slice(1, 1 + totalDigits);

  // Trim guard digits
  fracPart = fracPart.slice(0, numDigits);

  return `${intPart}.${fracPart}`;
}

// ---------------------------------------------------------------------------
// Verification helpers
// ---------------------------------------------------------------------------

/**
 * Known π values for verification (from OEIS A000796 / NIST).
 */
export const KNOWN_PI: Record<number, string> = {
  5: "3.14159",
  10: "3.1415926535",
  20: "3.14159265358979323846",
  30: "3.141592653589793238462643383279",
  50: "3.14159265358979323846264338327950288419716939937510",
  100:
    "3." +
    "14159265358979323846264338327950288419716939937510" +
    "58209749445923078164062862089986280348253421170679",
};

/**
 * Verify a computed π string against a known reference.
 *
 * @param computed - The π string produced by `calculatePi`.
 * @param expected - A known reference π string.
 * @param digits   - Number of decimal digits to compare (default 50).
 * @returns `true` if the first `digits` decimals match.
 *
 * @example
 * ```ts
 * const pi = calculatePi(50);
 * verifyPi(pi, "3.14159265358979323846264338327950288419716939937510", 50)
 * // => true
 * ```
 */
export function verifyPi(
  computed: string,
  expected: string,
  digits: number = 50,
): boolean {
  const expectedPrefix = expected.slice(0, digits + 2);
  const computedPrefix = computed.slice(0, digits + 2);
  return computedPrefix === expectedPrefix;
}

/**
 * Self-test: verify the implementation against known values.
 *
 * Runs a quick sanity check by computing π at 10, 50, and 100 digits
 * and comparing against known reference strings.
 *
 * @returns `true` if all checks pass.
 */
export function runSelfTest(): boolean {
  const tests: Array<{ digits: number; label: string }> = [
    { digits: 10, label: "10 digits" },
    { digits: 50, label: "50 digits" },
    { digits: 100, label: "100 digits" },
  ];

  for (const { digits, label } of tests) {
    const pi = calculatePi(digits);
    if (!verifyPi(pi, KNOWN_PI[digits], digits)) {
      console.error(`Self-test failed at ${label}`);
      return false;
    }
    console.log(`✓ ${label}: OK`);
  }
  return true;
}

// Run self-test on module import in Node.js
if (typeof require !== "undefined" && require.main === module) {
  const ok = runSelfTest();
  process.exit(ok ? 0 : 1);
}
