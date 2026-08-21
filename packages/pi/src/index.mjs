const DIGITS_PER_TERM = 14;
const CHUDNOVSKY_C3_OVER_24 = 10939058860032000n;
const A = 13591409n;
const B = 545140134n;

function assertDigitCount(digits) {
  if (!Number.isInteger(digits)) {
    throw new TypeError("digits must be an integer");
  }

  if (digits < 0) {
    throw new RangeError("digits must be greater than or equal to 0");
  }

  if (digits > 10000) {
    throw new RangeError("digits must be less than or equal to 10000");
  }
}

function integerSqrt(value) {
  if (value < 0n) {
    throw new RangeError("square root is undefined for negative values");
  }

  if (value < 2n) {
    return value;
  }

  let x0 = value;
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
      return { p: 1n, q: 1n, t: A };
    }

    const k = BigInt(start);
    const p = (6n * k - 5n) * (2n * k - 1n) * (6n * k - 1n);
    const q = k * k * k * CHUDNOVSKY_C3_OVER_24;
    const term = p * (A + B * k);

    return {
      p,
      q,
      t: start % 2 === 0 ? term : -term
    };
  }

  const middle = Math.floor((start + end) / 2);
  const left = binarySplit(start, middle);
  const right = binarySplit(middle, end);

  return {
    p: left.p * right.p,
    q: left.q * right.q,
    t: left.t * right.q + left.p * right.t
  };
}

function formatPiPrefix(scaledPi, precision, digits) {
  const raw = scaledPi.toString().padStart(precision + 1, "0");
  const integer = raw.slice(0, -precision) || "0";

  if (digits === 0) {
    return integer;
  }

  const decimals = raw.slice(-precision, -precision + digits).padEnd(digits, "0");
  return `${integer}.${decimals}`;
}

export function calculatePiPrefix(digits = 100) {
  assertDigitCount(digits);

  const guardDigits = 10;
  const precision = digits + guardDigits;
  const terms = Math.ceil((precision + 1) / DIGITS_PER_TERM) + 1;
  const scale = 10n ** BigInt(precision);
  const series = binarySplit(0, terms);
  const sqrt = integerSqrt(10005n * scale * scale);
  const scaledPi = (426880n * sqrt * series.q) / series.t;

  return formatPiPrefix(scaledPi, precision, digits);
}

export function explainPiLimit() {
  return "PI has an infinite, non-terminating decimal expansion, so a finite program can return exact finite prefixes but not a final decimal digit.";
}
