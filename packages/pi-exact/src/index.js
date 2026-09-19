const DIGITS_PER_TERM = 14;
const CHUDNOVSKY_C = 426880n;
const CHUDNOVSKY_SQRT = 10005n;
const CHUDNOVSKY_C3_OVER_24 = 10939058860032000n;

/**
 * Calculate an exact finite decimal prefix of PI.
 *
 * @param {number} decimalPlaces number of digits after the decimal point
 * @returns {string} PI formatted with the requested decimal precision
 */
export function calculatePi(decimalPlaces) {
  if (!Number.isSafeInteger(decimalPlaces) || decimalPlaces < 0) {
    throw new TypeError("decimalPlaces must be a non-negative safe integer");
  }

  const scaled = calculatePiScaled(decimalPlaces);
  const raw = scaled.toString().padStart(decimalPlaces + 1, "0");

  if (decimalPlaces === 0) {
    return raw;
  }

  const integer = raw.slice(0, -decimalPlaces);
  const fraction = raw.slice(-decimalPlaces);
  return `${integer}.${fraction}`;
}

/**
 * Return floor(PI * 10^decimalPlaces).
 *
 * @param {number} decimalPlaces number of decimal places to keep
 * @returns {bigint}
 */
export function calculatePiScaled(decimalPlaces) {
  if (!Number.isSafeInteger(decimalPlaces) || decimalPlaces < 0) {
    throw new TypeError("decimalPlaces must be a non-negative safe integer");
  }

  const terms = Math.floor(decimalPlaces / DIGITS_PER_TERM) + 2;
  const [, q, t] = binarySplit(0, terms);
  const scale = 10n ** BigInt(decimalPlaces);
  const sqrt = integerSqrt(CHUDNOVSKY_SQRT * scale * scale);

  return (q * CHUDNOVSKY_C * sqrt) / t;
}

/**
 * Compute the integer square root: floor(sqrt(value)).
 *
 * @param {bigint} value
 * @returns {bigint}
 */
export function integerSqrt(value) {
  if (value < 0n) {
    throw new RangeError("integerSqrt is undefined for negative values");
  }

  if (value < 2n) {
    return value;
  }

  let x0 = 1n << BigInt(Math.ceil(value.toString(2).length / 2));
  let x1 = (x0 + value / x0) >> 1n;

  while (x1 < x0) {
    x0 = x1;
    x1 = (x0 + value / x0) >> 1n;
  }

  return x0;
}

function binarySplit(start, end) {
  if (end - start === 1) {
    if (start === 0) {
      return [1n, 1n, 13591409n];
    }

    const k = BigInt(start);
    const p = (6n * k - 5n) * (2n * k - 1n) * (6n * k - 1n);
    const q = k * k * k * CHUDNOVSKY_C3_OVER_24;
    let t = p * (13591409n + 545140134n * k);

    if (start % 2 === 1) {
      t = -t;
    }

    return [p, q, t];
  }

  const mid = Math.floor((start + end) / 2);
  const [p1, q1, t1] = binarySplit(start, mid);
  const [p2, q2, t2] = binarySplit(mid, end);

  return [p1 * p2, q1 * q2, t1 * q2 + p1 * t2];
}
