/**
 * Arbitrary-precision integer helpers shared by the pi engines.
 *
 * Everything here operates on native `bigint` — no runtime dependencies.
 */

/** 10^n as a bigint. */
export function pow10(n: number): bigint {
  return 10n ** BigInt(n);
}

/**
 * Integer square root: the unique s >= 0 with s^2 <= n < (s+1)^2.
 *
 * Newton's method seeded from the bit length, which guarantees the
 * iteration converges monotonically in O(log log n) steps.
 */
export function isqrt(n: bigint): bigint {
  if (n < 0n) {
    throw new RangeError("isqrt: negative argument");
  }
  if (n < 2n) {
    return n;
  }
  // Seed: 2^(ceil(bitLength / 2)) is always >= floor(sqrt(n)).
  let x = 1n << BigInt(Math.ceil(bitLength(n) / 2));
  let y = (x + n / x) >> 1n;
  while (y < x) {
    x = y;
    y = (x + n / x) >> 1n;
  }
  return x;
}

/** Number of bits needed to represent a positive bigint. */
export function bitLength(n: bigint): number {
  let bits = 0;
  // Advance in 32-bit strides, then finish with toString(2) on the head.
  while (n >= 0x100000000n) {
    n >>= 32n;
    bits += 32;
  }
  return bits + n.toString(2).length;
}
