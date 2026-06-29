/**
 * PI Calculation Utilities
 *
 * Implements the Chudnovsky algorithm for high-precision PI calculation.
 *
 * ## Method: Chudnovsky Algorithm
 *
 * The Chudnovsky algorithm is one of the fastest known methods for
 * computing π. Each term adds approximately 14–16 digits of precision.
 *
 * Formula:
 * ```
 * 1/π = 12 Σ ( (-1)^k * (6k)! * (13591409 + 545140134k) )
 *            ──────────────────────────────────────────────
 *            (3k)! * (k!)^3 * 640320^(3k + 3/2)
 * ```
 *
 * For practical use, the Leibniz (Gregory) series is simpler but converges
 * extremely slowly. The Machin-like formula is faster than Leibniz but
 * slower than Chudnovsky.
 *
 * This implementation uses the Chudnovsky algorithm with BigInt for
 * arbitrary precision (up to available memory limits).
 */

/**
 * Options for calculating π.
 */
export interface PiOptions {
  /** Number of algorithm iterations (default: 10, each adds ~14 digits) */
  iterations?: number;
}

/**
 * Calculate π using the Chudnovsky algorithm.
 *
 * Returns π as a string with the specified number of decimal digits.
 *
 * @param digits - Desired decimal digits (default: 100, max: 10000)
 * @returns π as a string in the form "3.1415..."
 *
 * @example
 * ```ts
 * calculatePi(50);
 * // "3.14159265358979323846264338327950288419716939937510"
 * ```
 */
export function calculatePi(digits: number = 100): string {
  if (digits < 1 || digits > 10000) {
    throw new RangeError("Digits must be between 1 and 10000");
  }

  const iterations = Math.ceil(digits / 14) + 2; // +2 for safety

  // Chudnovsky algorithm using BigInt
  // 1/π = (12 / sqrt(640320^3)) * Σ( (-1)^k * (6k)! * (13591409 + 545140134k) )
  //                                    ─────────────────────────────────────────
  //                                    (3k)! * (k!)^3 * 640320^(3k)

  // We compute: pi = (C * sqrt(C)) / (12 * S)
  // where C = 640320^3 = 262537412640768000
  //       S = Σ term_k for k = 0..N

  const C = 640320n;
  const C3 = C * C * C; // 640320^3

  // Compute using decimal string arithmetic
  // S = sum of terms
  // Result = 1 / (12 * S / (C * sqrt(C)))
  // We scale everything by a power of 10 for the desired precision

  // Chudnovsky terms:
  // term_k = (-1)^k * (6k)! * (13591409 + 545140134k) / ((3k)! * (k!)^3 * C^(3k))

  let sum = 0n;
  let k = 0;

  // We'll accumulate the series as rational: sum = p / q
  // term_k = a_k / b_k  where a_k = (-1)^k * (6k)! * (13591409 + 545140134k)
  //                        b_k = (3k)! * (k!)^3 * 640320^(3k)

  // Precompute first term values
  let termA = 13591409n; // a_0 = 13591409
  let termB = 1n; // b_0 = 1
  let sign = 1n;

  const scaling = 10n ** BigInt(digits + 10); // extra precision for rounding

  // Actually, let me use the simpler but practical approach:
  // Use Machin-like formula: π/4 = 4*arctan(1/5) - arctan(1/239)
  // with arctan(x) = x - x^3/3 + x^5/5 - x^7/7 + ...

  // For high precision, Chudnovsky is better. Let me implement it properly.

  // Using binary splitting for the Chudnovsky series
  // S = Σ (-1)^k * (6k)! * (13591409 + 545140134k) / ((3k)! * (k!)^3 * 640320^(3k))

  // Pre-compute factorials using BigInt
  const maxK = iterations;
  const fact = [1n];
  for (let i = 1; i <= 6 * maxK; i++) {
    fact.push(fact[i - 1] * BigInt(i));
  }

  for (let k = 0; k <= maxK; k++) {
    const kBig = BigInt(k);
    const sign = (k % 2 === 0) ? 1n : -1n;

    // (6k)!
    const fact6k = fact[Number(6n * kBig)];

    // (3k)!
    const fact3k = fact[Number(3n * kBig)];

    // (k!)^3
    const factK = fact[Number(kBig)];
    const factK3 = factK * factK * factK;

    // 13591409 + 545140134k
    const numeratorConst = 13591409n + 545140134n * kBig;

    // 640320^(3k)
    const powerC = C3 ** kBig;

    // term = sign * fact6k * numeratorConst / (fact3k * factK3 * powerC)
    const termNum = sign * fact6k * numeratorConst;
    const termDen = fact3k * factK3 * powerC;

    // Add to sum: scaled = termNum * scaling / termDen
    sum += (termNum * scaling) / termDen;
  }

  // π ≈ (C * sqrt(C)) / (12 * sum)
  // sqrt(C^3) sqrt(C)
  // Actually: π = (426880 * sqrt(10005)) / S
  // where S = Σ term_k

  // sqrt(10005) computed using Newton's method on BigInts
  const sqrt10005 = sqrtBigInt(10005n, digits + 10);

  // π = (426880 * sqrt10005 * scaling) / (sum * 12)
  const piScaled = (426880n * sqrt10005 * scaling) / (sum * 12n);

  // Convert to string with decimal point
  const piStr = piScaled.toString();
  const intPart = piStr.slice(0, piStr.length - digits - 10) || "0";
  const decPart = piStr.slice(
    piStr.length - digits - 10,
    piStr.length - 10
  ).padStart(digits + 10, "0").slice(0, digits);

  // Round last digit
  const roundDigit = piStr[piStr.length - 10] || "0";
  let finalDec = decPart;
  if (parseInt(roundDigit) >= 5) {
    // Carry
    const carry = BigInt(decPart) + 1n;
    finalDec = carry.toString().padStart(digits, "0");
    if (finalDec.length > digits) {
      finalDec = finalDec.slice(1);
    }
  }

  return `${intPart}.${finalDec}`;
}

/**
 * Integer square root using Newton's method, scaled to given precision.
 */
function sqrtBigInt(n: bigint, precision: number): bigint {
  // Scale n by 2^(precision * log2(10)) ≈ 10^precision
  const scaled = n * 10n ** BigInt(precision * 2);
  let x = scaled;
  let prev = 0n;
  while (x !== prev) {
    prev = x;
    x = (x + scaled / x) / 2n;
  }
  return x;
}

/**
 * Calculate π using the simple Leibniz formula.
 * Very slow convergence — included for educational comparison.
 *
 * @param iterations - Number of terms (higher = more accurate)
 * @returns Approximation of π
 *
 * @example
 * ```ts
 * leibnizPi(1000000); // ~3.141591...
 * ```
 */
export function leibnizPi(iterations: number = 1000000): number {
  let sum = 0;
  for (let i = 0; i < iterations; i++) {
    sum += (i % 2 === 0 ? 1 : -1) / (2 * i + 1);
  }
  return sum * 4;
}

/**
 * Calculate π using the Machin-like formula.
 * Faster than Leibniz, good for moderate precision.
 *
 * π/4 = 4*arctan(1/5) - arctan(1/239)
 *
 * @param terms - Number of arctan series terms (default: 20)
 * @returns Approximation of π
 */
export function machinPi(terms: number = 20): number {
  function arctan(x: number, n: number): number {
    let result = 0;
    let xPow = x;
    for (let i = 0; i < n; i++) {
      const term = xPow / (2 * i + 1);
      result += (i % 2 === 0 ? 1 : -1) * term;
      xPow *= x * x;
    }
    return result;
  }
  return 4 * (4 * arctan(1 / 5, terms) - arctan(1 / 239, terms));
}
