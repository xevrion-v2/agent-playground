/**
 * High-precision PI calculation using the Chudnovsky algorithm.
 *
 * The Chudnovsky algorithm converges extremely rapidly — each iteration
 * produces approximately 14.18 additional correct decimal digits of PI.
 * It is used by world-record PI computation attempts.
 *
 * Formula:
 *   1/π = (12 / sqrt(640320^3)) * Σ_{k=0}^{∞} (-1)^k * (6k)! * (13591409 + 545140134k)
 *                                                           / ((3k)! * (k!)^3 * 640320^(3k))
 *
 * This implementation uses JavaScript's built-in number precision (IEEE 754 double),
 * which gives approximately 15–16 significant decimal digits. For arbitrary precision,
 * a big-integer library (e.g. decimal.js, big.js) would be needed.
 */

const C = 640320n;
const C3_OVER_24 = (C * C * C) / 24n;

/** Recursive binary splitting for the Chudnovsky series. */
function binarySplit(a: bigint, b: bigint): [bigint, bigint, bigint] {
  if (b - a === 1n) {
    let pab: bigint;
    if (a === 0n) {
      pab = 1n;
    } else {
      pab = (6n * a - 5n) * (2n * a - 1n) * (6n * a - 1n);
    }
    const qab = a * a * a * C3_OVER_24;
    const tab = pab * (13591409n + 545140134n * a);
    return a % 2n === 0n ? [pab, qab, tab] : [pab, qab, -tab];
  }

  const m = (a + b) / 2n;
  const [pam, qam, tam] = binarySplit(a, m);
  const [pmb, qmb, tmb] = binarySplit(m, b);

  return [pam * pmb, qam * qmb, qmb * tam + pam * tmb];
}

/**
 * Compute PI to a given number of decimal digits using the Chudnovsky algorithm
 * with BigInt binary splitting and integer square-root approximation.
 *
 * @param digits - Number of decimal digits (default 50; doubles can hold ~15 reliably)
 * @returns PI as a string with the requested decimal digits
 */
export function computePi(digits = 50): string {
  // Number of Chudnovsky terms needed: ~digits / 14.18
  const terms = Math.ceil(digits / 14) + 2;

  const [, Q, T] = binarySplit(0n, BigInt(terms));

  // Compute sqrt(10005) * Q * 426880 as a scaled integer
  // Scale factor: 10^(digits+10) for extra guard digits
  const scale = 10n ** BigInt(digits + 10);
  const sqrtInput = 10005n * scale * scale;

  // Integer square root via Newton's method
  function isqrt(n: bigint): bigint {
    if (n < 0n) throw new RangeError("Square root of negative number");
    if (n === 0n) return 0n;
    let x = n;
    let y = (x + 1n) / 2n;
    while (y < x) {
      x = y;
      y = (x + n / x) / 2n;
    }
    return x;
  }

  const sqrtVal = isqrt(sqrtInput);
  const piScaled = (426880n * sqrtVal * Q) / T;

  // Convert to decimal string
  const piStr = piScaled.toString();
  const intPart = piStr.slice(0, 1);
  const fracPart = piStr.slice(1, digits + 1);

  return `${intPart}.${fracPart}`;
}
