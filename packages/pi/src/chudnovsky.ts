/**
 * Chudnovsky algorithm with binary splitting.
 *
 * The Chudnovsky series (1988) is the fastest known practical series for pi:
 *
 *   1/pi = 12 * SUM_{k=0..inf} (-1)^k (6k)! (13591409 + 545140134 k)
 *                               -------------------------------------
 *                               (3k)! (k!)^3 640320^(3k + 3/2)
 *
 * Each term contributes log10(640320^3 / 24 / 72) ~= 14.1816 decimal digits.
 * It underpins every world-record pi computation since 1989.
 *
 * Rather than summing terms one by one (O(N^2) bigint work), the series is
 * evaluated with BINARY SPLITTING: the sum over [a, b) is reduced to three
 * integers P(a,b), Q(a,b), T(a,b) combined recursively from half-ranges:
 *
 *   P(a,b) = P(a,m) * P(m,b)
 *   Q(a,b) = Q(a,m) * Q(m,b)
 *   T(a,b) = T(a,m) * Q(m,b) + P(a,m) * T(m,b)
 *
 * so all bigint multiplications happen between balanced, similarly-sized
 * operands. This is the same evaluation strategy used by y-cruncher and GMP.
 *
 * Final assembly:
 *
 *   pi = 426880 * sqrt(10005) * Q(1,N) / (13591409 * Q(1,N) + T(1,N))
 */

import { isqrt, pow10 } from "./bigmath.js";

/** Decimal digits resolved per series term. */
export const DIGITS_PER_TERM = 14.181647462725477; // log10(151931373056000 / 6 / 12)

const A = 13591409n;
const B = 545140134n;
// 640320^3 / 24 — the k^3 coefficient in Q's leaf factor.
const C3_OVER_24 = 10939058860032000n;

interface SplitResult {
  P: bigint;
  Q: bigint;
  T: bigint;
}

/**
 * Binary splitting over term indices [a, b), for a >= 1.
 *
 * Leaf values for a single term k:
 *   P(k, k+1) = -(6k - 5)(2k - 1)(6k - 1)   (sign carries (-1)^k)
 *   Q(k, k+1) = k^3 * 640320^3 / 24
 *   T(k, k+1) = P(k, k+1) * (13591409 + 545140134 k)
 */
function split(a: bigint, b: bigint): SplitResult {
  if (b - a === 1n) {
    const P = -((6n * a - 5n) * (2n * a - 1n) * (6n * a - 1n));
    const Q = a * a * a * C3_OVER_24;
    const T = P * (A + B * a);
    return { P, Q, T };
  }
  const m = (a + b) >> 1n;
  const left = split(a, m);
  const right = split(m, b);
  return {
    P: left.P * right.P,
    Q: left.Q * right.Q,
    T: left.T * right.Q + left.P * right.T,
  };
}

/**
 * Compute floor(pi * 10^precision) exactly, as a bigint.
 *
 * The result's decimal representation is "3" followed by `precision`
 * correct decimal digits of pi (subject only to the final floor, which the
 * caller guards against — see `computePiDigits` in index.ts).
 */
export function chudnovskyPiScaled(precision: number): bigint {
  if (!Number.isInteger(precision) || precision < 0) {
    throw new RangeError("precision must be a non-negative integer");
  }
  const terms = BigInt(Math.max(1, Math.ceil(precision / DIGITS_PER_TERM) + 1));
  const { Q, T } = split(1n, terms + 1n);

  // sqrt(10005) scaled to `precision` decimal places.
  const sqrtC = isqrt(10005n * pow10(2 * precision));

  // pi = 426880 * sqrt(10005) * Q / (A*Q + T)
  return (426880n * sqrtC * Q) / (A * Q + T);
}
