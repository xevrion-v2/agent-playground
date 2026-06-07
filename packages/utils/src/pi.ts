/**
 * Integer square root using Newton's method (BigInt arithmetic).
 */
function isqrt(n: bigint): bigint {
  if (n <= 0n) return 0n
  let x = n
  let y = (x + 1n) >> 1n
  while (y < x) {
    x = y
    y = (x + n / x) >> 1n
  }
  return x
}

/**
 * Binary splitting for the Chudnovsky series.
 * Returns [P, Q, T] such that T/Q approximates the partial sum.
 */
function chudnovskySplit(a: bigint, b: bigint): [bigint, bigint, bigint] {
  if (b - a === 1n) {
    let P: bigint, Q: bigint
    if (a === 0n) {
      P = 1n
      Q = 1n
    } else {
      P = -(6n * a - 5n) * (2n * a - 1n) * (6n * a - 1n)
      Q = 10939058860032000n * a * a * a
    }
    const T = (13591409n + 545140134n * a) * P
    return [P, Q, T]
  }
  const m = (a + b) >> 1n
  const [Pam, Qam, Tam] = chudnovskySplit(a, m)
  const [Pmb, Qmb, Tmb] = chudnovskySplit(m, b)
  return [Pam * Pmb, Qam * Qmb, Qmb * Tam + Pam * Tmb]
}

/**
 * Calculates PI to a specified number of decimal places using the Chudnovsky
 * algorithm with binary splitting and BigInt arithmetic for exact precision.
 *
 * @param digits - Number of decimal places to calculate (e.g. 10 → "3.1415926535")
 * @returns PI as a string "3.DDDDD..." with exactly `digits` decimal places
 */
export function calculatePI(digits: number): string {
  if (digits <= 0) return "3"

  const GUARD = 10
  const prec = digits + GUARD
  const scale = 10n ** BigInt(prec)
  const terms = BigInt(Math.ceil(digits / 14) + 2)

  const [, Q, T] = chudnovskySplit(0n, terms)

  // π = 426880 * sqrt(10005) * Q / T
  const sqrt10005 = isqrt(10005n * scale * scale)
  const pi = (426880n * sqrt10005 * Q) / T

  const s = pi.toString()
  // s represents π * 10^prec, so s ≈ "3DDDDDD..."
  return s[0] + "." + s.slice(1, digits + 1)
}
