const CHUDNOVSKY_C = 640320n;
const CHUDNOVSKY_C3_OVER_24 = (CHUDNOVSKY_C ** 3n) / 24n;
const DIGITS_PER_TERM = 14;
const DEFAULT_GUARD_DIGITS = 10;
const DEFAULT_MAX_DECIMAL_PLACES = 10000;

export interface PiPrefixOptions {
  guardDigits?: number;
  maxDecimalPlaces?: number;
}

interface SplitResult {
  p: bigint;
  q: bigint;
  t: bigint;
}

export function calculatePiPrefix(decimalPlaces = 100, options: PiPrefixOptions = {}): string {
  const guardDigits = options.guardDigits ?? DEFAULT_GUARD_DIGITS;
  const maxDecimalPlaces = options.maxDecimalPlaces ?? DEFAULT_MAX_DECIMAL_PLACES;

  assertSafeNonNegativeInteger(decimalPlaces, "decimalPlaces");
  assertSafeNonNegativeInteger(guardDigits, "guardDigits");

  if (decimalPlaces > maxDecimalPlaces) {
    throw new RangeError(`decimalPlaces must be <= ${maxDecimalPlaces}`);
  }

  const workingDigits = decimalPlaces + guardDigits;
  const termCount = Math.ceil(workingDigits / DIGITS_PER_TERM) + 2;
  const scale = pow10(workingDigits);
  const { q, t } = binarySplit(0, termCount);
  const sqrt = integerSqrt(10005n * scale * scale);
  let scaledPi = (426880n * sqrt * q) / t;

  if (guardDigits > 0) {
    scaledPi /= pow10(guardDigits);
  }

  return formatScaledDecimal(scaledPi, decimalPlaces);
}

export function explainPiLimit(): string {
  return "PI is irrational, so it has no final decimal point. This utility computes exact finite decimal prefixes with BigInt integer arithmetic.";
}

export function integerSqrt(value: bigint): bigint {
  if (value < 0n) {
    throw new RangeError("integerSqrt requires a non-negative bigint");
  }

  if (value < 2n) {
    return value;
  }

  let x0 = value;
  let x1 = (x0 + value / x0) >> 1n;

  while (x1 < x0) {
    x0 = x1;
    x1 = (x1 + value / x1) >> 1n;
  }

  return x0;
}

function binarySplit(a: number, b: number): SplitResult {
  if (b - a === 1) {
    if (a === 0) {
      return { p: 1n, q: 1n, t: 13591409n };
    }

    const k = BigInt(a);
    const p = (6n * k - 5n) * (2n * k - 1n) * (6n * k - 1n);
    const q = k ** 3n * CHUDNOVSKY_C3_OVER_24;
    let t = p * (13591409n + 545140134n * k);

    if (a % 2 === 1) {
      t = -t;
    }

    return { p, q, t };
  }

  const mid = Math.floor((a + b) / 2);
  const left = binarySplit(a, mid);
  const right = binarySplit(mid, b);

  return {
    p: left.p * right.p,
    q: left.q * right.q,
    t: left.t * right.q + left.p * right.t
  };
}

function formatScaledDecimal(value: bigint, decimalPlaces: number): string {
  if (decimalPlaces === 0) {
    return value.toString();
  }

  const raw = value.toString().padStart(decimalPlaces + 1, "0");
  return `${raw.slice(0, -decimalPlaces)}.${raw.slice(-decimalPlaces)}`;
}

function pow10(exponent: number): bigint {
  return 10n ** BigInt(exponent);
}

function assertSafeNonNegativeInteger(value: number, name: string): void {
  if (!Number.isSafeInteger(value) || value < 0) {
    throw new RangeError(`${name} must be a non-negative safe integer`);
  }
}
