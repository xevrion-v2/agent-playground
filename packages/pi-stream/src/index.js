const DIGITS_PER_TERM = 14
const CHUDNOVSKY_C = 640_320n
const CHUDNOVSKY_C3_OVER_24 = (CHUDNOVSKY_C ** 3n) / 24n
const BASE_TERM = 13_591_409n
const TERM_FACTOR = 545_140_134n
const PI_FACTOR = 426_880n
const SQRT_TARGET = 10_005n

/**
 * Compute the exact finite decimal prefix of pi.
 *
 * Pi has no final decimal digit, so a finite program cannot emit "the whole"
 * decimal expansion. This function returns the mathematically exact prefix for
 * the requested number of digits after the decimal point.
 *
 * @param {number} decimalDigits
 * @returns {string}
 */
export function calculatePiPrefix(decimalDigits) {
  assertDigitCount(decimalDigits)

  if (decimalDigits === 0) {
    return "3"
  }

  const guardDigits = 10
  const workingDigits = decimalDigits + guardDigits
  const terms = Math.ceil((workingDigits + 1) / DIGITS_PER_TERM) + 1
  const { q, t } = binarySplitChudnovsky(0, terms)
  const scale = 10n ** BigInt(workingDigits)
  const sqrt = integerSqrt(SQRT_TARGET * scale * scale)
  const scaledPi = (q * PI_FACTOR * sqrt) / t
  const trimmed = scaledPi / (10n ** BigInt(guardDigits))
  const digits = trimmed.toString().padStart(decimalDigits + 1, "0")

  return `${digits.slice(0, -decimalDigits)}.${digits.slice(-decimalDigits)}`
}

/**
 * Format pi into deterministic line chunks for demos or logs.
 *
 * @param {string} pi
 * @param {{ lineWidth?: number, groupSize?: number }} [options]
 * @returns {string}
 */
export function formatPiChunks(pi, options = {}) {
  const lineWidth = options.lineWidth ?? 80
  const groupSize = options.groupSize ?? 10

  if (!Number.isInteger(lineWidth) || lineWidth < 8) {
    throw new RangeError("lineWidth must be an integer >= 8")
  }
  if (!Number.isInteger(groupSize) || groupSize < 1) {
    throw new RangeError("groupSize must be a positive integer")
  }

  const [integerPart, fractionalPart = ""] = pi.split(".")
  const grouped = fractionalPart.match(new RegExp(`.{1,${groupSize}}`, "g")) ?? []
  const lines = []
  let current = `${integerPart}.`

  for (const group of grouped) {
    const next = current.endsWith(".") ? `${current}${group}` : `${current} ${group}`
    if (next.length > lineWidth) {
      lines.push(current)
      current = group
    } else {
      current = next
    }
  }

  if (current.length > 0) {
    lines.push(current)
  }

  return lines.join("\n")
}

/**
 * @param {number} a
 * @param {number} b
 * @returns {{ p: bigint, q: bigint, t: bigint }}
 */
function binarySplitChudnovsky(a, b) {
  if (b - a === 1) {
    if (a === 0) {
      return { p: 1n, q: 1n, t: BASE_TERM }
    }

    const k = BigInt(a)
    const p = (6n * k - 5n) * (2n * k - 1n) * (6n * k - 1n)
    const q = k ** 3n * CHUDNOVSKY_C3_OVER_24
    const term = p * (BASE_TERM + TERM_FACTOR * k)
    const t = a % 2 === 0 ? term : -term

    return { p, q, t }
  }

  const midpoint = Math.floor((a + b) / 2)
  const left = binarySplitChudnovsky(a, midpoint)
  const right = binarySplitChudnovsky(midpoint, b)

  return {
    p: left.p * right.p,
    q: left.q * right.q,
    t: right.q * left.t + left.p * right.t,
  }
}

/**
 * @param {bigint} value
 * @returns {bigint}
 */
function integerSqrt(value) {
  if (value < 0n) {
    throw new RangeError("square root is undefined for negative BigInt values")
  }
  if (value < 2n) {
    return value
  }

  let x0 = value
  let x1 = (x0 + value / x0) >> 1n

  while (x1 < x0) {
    x0 = x1
    x1 = (x0 + value / x0) >> 1n
  }

  return x0
}

/**
 * @param {number} decimalDigits
 */
function assertDigitCount(decimalDigits) {
  if (!Number.isInteger(decimalDigits)) {
    throw new TypeError("decimalDigits must be an integer")
  }
  if (decimalDigits < 0) {
    throw new RangeError("decimalDigits must be non-negative")
  }
  if (decimalDigits > 100_000) {
    throw new RangeError("decimalDigits must be <= 100000")
  }
}
