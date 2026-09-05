/**
 * High-Precision PI Calculator — Chudnovsky Algorithm
 *
 * ## Why "exact" PI is impossible
 *
 * PI (π) is an **irrational** and **transcendental** number, meaning it
 * has infinitely many non-repeating decimal digits. There is no "last
 * decimal point" — the digits continue forever without pattern.
 *
 * However, we can compute PI to any desired number of decimal places
 * using mathematical series that converge to PI.
 *
 * ## Algorithm: Chudnovsky Series
 *
 * The Chudnovsky algorithm is the fastest known formula for computing
 * PI and is used by world-record computations (100+ trillion digits).
 *
 * The series is:
 *
 *   1/π = 12 · Σ ((-1)^k · (6k)! · (13591409 + 545140134k))
 *                / ((3k)! · (k!)^3 · 640320^(3k + 3/2))
 *
 * Each term adds approximately **14 new correct digits**, making it
 * extremely efficient compared to Machin's formula (~1.4 digits/term)
 * or the Leibniz series (~0.3 digits/term).
 *
 * ## Implementation
 *
 * We use JavaScript BigInt for arbitrary-precision integer arithmetic
 * with a fixed-point scaling approach (multiply by 10^(digits+20) to
 * simulate decimal precision).
 *
 * @module piExact
 */

/**
 * Computes PI to `digits` decimal places using the Chudnovsky algorithm.
 *
 * @param digits - Number of decimal digits to compute (default: 1000)
 * @returns String representation of PI with the requested precision
 *
 * @example
 * ```ts
 * computePI(100);
 * // "3.14159265358979323846264338327950288419716939937510..."
 *
 * computePI(1000);
 * // PI to 1000 decimal places
 * ```
 */
export function computePI(digits = 1000): string {
  // Extra guard digits to handle rounding
  const guard = 20;
  const precision = digits + guard;
  const one = 10n ** BigInt(precision);

  // Chudnovsky constants
  const C = 640320n;
  const C3_OVER_24 = C * C * C / 24n;
  const K_CONSTANT = 13591409n;
  const K_MULTIPLIER = 545140134n;

  let sum = K_CONSTANT * one; // first term (k=0)
  let ak = one; // (-1)^k * (6k)! / ((3k)! * (k!)^3 * C^(3k))

  // Each term adds ~14 digits, so we need roughly digits/14 terms
  const terms = Math.ceil(precision / 14) + 2;

  for (let k = 1; k <= terms; k++) {
    const kb = BigInt(k);

    // Update ak using recurrence relation to avoid computing factorials
    // ak *= -(6k-5)(2k-1)(6k-1) / (k^3 * C3_OVER_24)
    ak = ak * -(6n * kb - 5n) * (2n * kb - 1n) * (6n * kb - 1n);
    ak = ak / (kb * kb * kb * C3_OVER_24);

    sum += ak * (K_CONSTANT + K_MULTIPLIER * kb);
  }

  // PI = 426880 * sqrt(10005) / sum
  // We need integer sqrt of (10005 * one * one)
  const sqrtArg = 10005n * one * one;
  const sqrtVal = isqrt(sqrtArg);

  const pi = (426880n * sqrtVal * one) / sum;

  // Format as "3.14159..."
  const piStr = pi.toString();
  // Handle potential negative sign from rounding
  const absStr = piStr.startsWith("-") ? piStr.slice(1) : piStr;
  return absStr[0] + "." + absStr.slice(1, digits + 1);
}

/**
 * Integer square root using Newton's method with BigInt.
 */
function isqrt(n: bigint): bigint {
  if (n < 0n) throw new Error("Square root of negative number");
  if (n === 0n) return 0n;

  let x = n;
  let y = (x + 1n) / 2n;

  while (y < x) {
    x = y;
    y = (x + n / x) / 2n;
  }

  return x;
}

// ── Verification ─────────────────────────────────────────────────
const KNOWN_PI_100 =
  "3.1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679";

const result = computePI(100);
if (result !== KNOWN_PI_100) {
  console.error("Verification FAILED!");
  console.error("Expected:", KNOWN_PI_100);
  console.error("Got:     ", result);
} else {
  console.log("✓ Chudnovsky PI verified to 100 digits");
  console.log("\nPI to 500 digits:");
  console.log(computePI(500));
  console.log("\n---");
  console.log("Note: PI is irrational — it has infinitely many digits.");
  console.log("There is no 'last decimal point'. We can compute as many");
  console.log("digits as desired, but the sequence never terminates.");
}
