/**
 * Compute π using the Gauss-Legendre algorithm with BigInt arithmetic.
 *
 * Converges quadratically — each iteration doubles correct digits.
 * ~10 iterations for 1000 digits, ~17 for 100000 digits.
 *
 * Reference: https://en.wikipedia.org/wiki/Gauss-Legendre_algorithm
 *
 * @param digits — decimal places to compute (default 1000)
 * @returns π as a string with the requested precision
 */
export function pi(digits: number = 1000): string {
  const extra = 10;
  const S = 10n ** BigInt(digits + extra);

  // a₀ = 1, b₀ = 1/√2, t₀ = 1/4, p₀ = 1
  let a = 1n * S;
  let b = sqrtBigInt(S * S / 2n);           // S / √2
  let t = S / 4n;
  let p = S;

  const iters = Math.ceil(Math.log2(digits)) + 2;
  for (let i = 0; i < iters; i++) {
    const an = (a + b) / 2n;
    const bn = sqrtBigInt(a * b);
    const diff = a - an;
    t = t - p * diff * diff / S;
    a = an;
    b = bn;
    p = 2n * p;
  }

  // π ≈ (a + b)² / 4t
  const num = (a + b) * (a + b);
  const den = 4n * t;
  const piBig = num * S / den;
  const s = piBig.toString();

  return s[0] + "." + s.slice(1, 1 + digits);
}

function sqrtBigInt(n: bigint): bigint {
  if (n <= 1n) return n;
  let x = n;
  for (let i = 0; i < 200; i++) {
    const nx = (x + n / x) / 2n;
    if (nx >= x) return x;
    x = nx;
  }
  return x;
}
