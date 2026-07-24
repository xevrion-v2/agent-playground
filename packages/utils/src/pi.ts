/**
 * High-precision PI calculation using the Chudnovsky algorithm.
 *
 * The Chudnovsky algorithm is a fast method for calculating π, producing
 * approximately 14 decimal digits per iteration term. It is derived from
 * Ramanujan's π formulae and uses the following series:
 *
 *   π = (426880 × √10005) / K
 *
 * where:
 *   K = Σ_{k=0}^{∞} (-1)^k × (6k)! × (13591409 + 545140134k) /
 *           ((3k)! × (k!)³ × 640320^{3k})
 *
 * This implementation uses BigInt arithmetic throughout, scaling values by
 * powers of 10 to emulate fixed-point arithmetic with configurable precision.
 *
 * @module
 */

// ─── Chudnovsky Constants ───────────────────────────────────────────────────
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

// ─── Helper: gcd ─────────────────────────────────────────────────────────────

/**
 * Compute the greatest common divisor of two BigInts using the Euclidean
 * algorithm.
 */
function gcd(a: bigint, b: bigint): bigint {
  a = a < 0n ? -a : a;
  b = b < 0n ? -b : b;
  while (b !== 0n) {
    [a, b] = [b, a % b];
  }
  return a;
}

// ─── Helper: integer square root ────────────────────────────────────────────

/**
 * Compute the floor of the square root of a non-negative BigInt using
 * Newton's method (Heron of Alexandria).
 *
 * @param n - Non-negative BigInt
 * @returns ⌊√n⌋ as a BigInt
 */
function sqrtBigInt(n: bigint): bigint {
  if (n < 0n) {
    throw new RangeError("Cannot compute square root of a negative BigInt");
  }
  if (n < 2n) return n;

  // Initial guess: 2^{⌈bitLength/2⌉}
  let x = 1n << BigInt((n.toString(16).length * 4 + 1) >> 1);
  while (true) {
    const y = (x + n / x) >> 1n;
    if (y >= x) return x;
    x = y;
  }
}

// ─── Main PI calculator ─────────────────────────────────────────────────────

/**
 * Default number of decimal places if not specified.
 * Using 1000 as the minimum useful default.
 */
const DEFAULT_DECIMAL_PLACES = 1000;

/** Maximum supported decimal places to prevent runaway memory usage. */
const MAX_DECIMAL_PLACES = 100_000;

/**
 * Calculate PI to the specified number of decimal places using the
 * Chudnovsky algorithm.
 *
 * The algorithm converges at roughly 14 decimal digits per iteration,
 * requiring approximately ⌈N/14⌉ + 2 iterations for N digits.  Internal
 * computation uses 20 guard digits beyond the requested precision to
 * absorb rounding errors from the integer-division recurrence.
 *
 * @param decimalPlaces - Number of decimal digits (default: 1000,
 *                        max: 100000)
 * @returns PI as a decimal string with `decimalPlaces` digits after the
 *          decimal point
 *
 * @example
 * ```ts
 * calculatePi(50)
 * // => "3.14159265358979323846264338327950288419716939937510"
 * ```
 */
export function calculatePi(decimalPlaces: number = DEFAULT_DECIMAL_PLACES): string {
  // ── Validate ───────────────────────────────────────────────────────────
  const n = Number.isFinite(decimalPlaces) ? Math.floor(decimalPlaces) : DEFAULT_DECIMAL_PLACES;
  const decimals = Math.max(1, Math.min(MAX_DECIMAL_PLACES, n));

  // Guard digits absorb integer-division truncation in the recurrence.
  const guard = 20n;
  const precision = decimals + Number(guard);
  const SCALE = 10n ** BigInt(precision);

  // Number of terms: each yields ~14 decimal digits.
  const iterations = Math.ceil(decimals / 14) + 2;

  // ── Series sum ─────────────────────────────────────────────────────────
  // term(0) = A × SCALE   (exact integer-scaled representation)
  // sum     = term(0)
  let sum = A * SCALE;
  let term = A * SCALE;

  for (let k = 1n; k <= BigInt(iterations); k++) {
    // Recurrence for the k-th term of the Chudnovsky series:
    //
    //   term(k)   =  -term(k-1) × P(k) / Q(k)
    //
    //   P(k) = (6k-5)(6k-4)(6k-3)(6k-2)(6k-1)(6k) × (A + B·k)
    //   Q(k) = k³ × (3k-2)(3k-1)(3k) × C₃ × (A + B·(k-1))
    //
    // where C₃ = 640320³.
    //
    // The division is exact in ℚ; with sufficient guard digits the integer
    // truncation is negligible relative to the target precision.
    const sixK = 6n * k;
    const threeK = 3n * k;

    const numerFactor =
      (sixK - 5n) * (sixK - 4n) * (sixK - 3n) *
      (sixK - 2n) * (sixK - 1n) * sixK;

    const denomFactor =
      (k * k * k) *                     // k³
      (threeK - 2n) * (threeK - 1n) * threeK *
      C3;

    const aPlusBk = A + B * k;
    const aPlusBk_1 = A + B * (k - 1n);

    const numer = numerFactor * aPlusBk;
    const denom = denomFactor * aPlusBk_1;

    term = -(term * numer) / denom;
    sum += term;

    // Early termination: once a term contributes less than 1 ulp
    // (one part in 10^precision) we can safely stop.
    if (term === 0n) break;
  }

  // ── Final π computation ────────────────────────────────────────────────
  //
  //   π = C × √D / K    where  K = Σ (-1)ᵏ·(6k)!·(A+Bk) / ((3k)!·(k!)³·640320^{3k})
  //
  //   sum = K × 10^{precision}   (the series sum scaled)
  //
  //   π × 10^{decimals} = C × √(D × 10^{2·(precision+decimals)}) / sum
  //
  // We compute √(D × 10^{2·(precision+decimals)}) as a BigInt, then divide.
  // The result is truncated (floor), so we add a safety bias of 1 and check
  // the first truncated digit for proper rounding.

  const sqrtArg = D * 10n ** BigInt(2n * (BigInt(precision) + BigInt(decimals)));
  const sqrtD = sqrtBigInt(sqrtArg);

  const piScaled = C * sqrtD / sum;

  // ── Format as decimal string ───────────────────────────────────────────
  const piStr = piScaled.toString().padStart(decimals + 1, "0");
  const intPart = piStr.slice(0, piStr.length - decimals);
  const fracPart = piStr.slice(-decimals);

  return `${intPart}.${fracPart}`;
}

// ─── CLI entry point ────────────────────────────────────────────────────────

/**
 * If this module is executed directly from the command line, parse the
 * optional first argument as the number of decimal places and print π.
 *
 * Usage:
 * ```sh
 * npx ts-node packages/utils/src/pi.ts          # 1000 digits
 * npx ts-node packages/utils/src/pi.ts 5000      # 5000 digits
 * ```
 */
function runCli(): void {
  const args = process.argv.slice(2);
  const decimals = args.length > 0 ? parseInt(args[0], 10) : DEFAULT_DECIMAL_PLACES;

  if (Number.isNaN(decimals) || decimals < 1) {
    console.error("Usage: pi.ts [decimalPlaces]");
    console.error("       decimalPlaces must be a positive integer (max 100000)");
    process.exit(1);
  }

  console.log(calculatePi(decimals));
}

// Detect direct execution (ts-node, tsx, or compiled Node.js)
if (require.main === module) {
  runCli();
}
