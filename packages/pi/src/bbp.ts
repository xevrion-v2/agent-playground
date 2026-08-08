/**
 * Bailey–Borwein–Plouffe (BBP) hexadecimal digit extraction (1995).
 *
 *   pi = SUM_{k=0..inf} 1/16^k * ( 4/(8k+1) - 2/(8k+4) - 1/(8k+5) - 1/(8k+6) )
 *
 * The BBP formula computes hex digits of pi AT AN ARBITRARY POSITION without
 * computing any of the digits before it. That makes it the ideal independent
 * spot-checker: it shares no code path, no radix, and no series with the
 * decimal engines, yet must agree with them digit-for-digit once the decimal
 * result is re-expressed in base 16.
 *
 * The modular exponentiations are done exactly in bigint; only the final
 * fractional accumulation uses floating point, which is reliable for the
 * handful of hex digits extracted per call (we expose 6, compare 4).
 */

/** 16^exp mod m, exact, via square-and-multiply on bigint. */
function modPow16(exp: bigint, m: bigint): bigint {
  if (m === 1n) {
    return 0n;
  }
  let result = 1n;
  let base = 16n % m;
  let e = exp;
  while (e > 0n) {
    if (e & 1n) {
      result = (result * base) % m;
    }
    base = (base * base) % m;
    e >>= 1n;
  }
  return result;
}

/** Fractional part of SUM_k 16^(n-k) / (8k + j), the BBP partial sum. */
function seriesFraction(j: number, n: number): number {
  let s = 0;
  // Left sum: k = 0..n, exact modular arithmetic keeps terms in [0, 1).
  for (let k = 0; k <= n; k++) {
    const denom = 8 * k + j;
    const num = modPow16(BigInt(n - k), BigInt(denom));
    s += Number(num) / denom;
    s -= Math.floor(s);
  }
  // Right tail: k > n, terms decay by 16x each step; ~12 terms saturate a double.
  for (let k = n + 1; k <= n + 14; k++) {
    s += Math.pow(16, n - k) / (8 * k + j);
  }
  return s - Math.floor(s);
}

const HEX = "0123456789abcdef";

/**
 * Hex digits of pi starting at 0-indexed position `n` after the hexadecimal
 * point (position 0 is the first hex digit, '2' of 3.243f6a...).
 *
 * Returns `count` digits (max 6 — beyond that double rounding bites).
 */
export function bbpHexDigits(n: number, count = 6): string {
  if (!Number.isInteger(n) || n < 0) {
    throw new RangeError("position must be a non-negative integer");
  }
  if (!Number.isInteger(count) || count < 1 || count > 6) {
    throw new RangeError("count must be between 1 and 6");
  }
  let frac =
    4 * seriesFraction(1, n) -
    2 * seriesFraction(4, n) -
    seriesFraction(5, n) -
    seriesFraction(6, n);
  frac -= Math.floor(frac);

  let out = "";
  for (let i = 0; i < count; i++) {
    frac *= 16;
    const digit = Math.floor(frac);
    out += HEX[digit];
    frac -= digit;
  }
  return out;
}
