const CHUDNOVSKY_DIGITS_PER_TERM = 14;
const GUARD_DIGITS = 10;
const C = 426_880n;
const L0 = 13_591_409n;
const L_STEP = 545_140_134n;
const X = 640_320n ** 3n / 24n;

type SplitResult = {
  p: bigint;
  q: bigint;
  t: bigint;
};

function assertValidDigits(digitsAfterDecimal: number) {
  if (!Number.isInteger(digitsAfterDecimal) || digitsAfterDecimal < 0) {
    throw new RangeError("digitsAfterDecimal must be a non-negative integer");
  }
}

function integerSqrt(value: bigint): bigint {
  if (value < 0n) {
    throw new RangeError("Cannot calculate square root of a negative bigint");
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

function binarySplit(start: number, end: number): SplitResult {
  if (end - start === 1) {
    if (start === 0) {
      return { p: 1n, q: 1n, t: L0 };
    }

    const k = BigInt(start);
    const p = (6n * k - 5n) * (2n * k - 1n) * (6n * k - 1n);
    const q = k ** 3n * X;
    const l = L0 + L_STEP * k;
    const t = start % 2 === 0 ? p * l : -p * l;

    return { p, q, t };
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

export function calculatePiPrefix(digitsAfterDecimal: number): string {
  assertValidDigits(digitsAfterDecimal);

  const internalDigits = digitsAfterDecimal + GUARD_DIGITS;
  const scale = 10n ** BigInt(internalDigits);
  const terms =
    Math.ceil((internalDigits + 1) / CHUDNOVSKY_DIGITS_PER_TERM) + 1;
  const { q, t } = binarySplit(0, terms);
  const sqrtC = integerSqrt(10_005n * scale * scale);
  const scaledPi = (q * C * sqrtC) / t;
  const prefix = scaledPi / 10n ** BigInt(GUARD_DIGITS);
  const raw = prefix.toString().padStart(digitsAfterDecimal + 1, "0");

  if (digitsAfterDecimal === 0) {
    return raw;
  }

  const integerPart = raw.slice(0, -digitsAfterDecimal);
  const decimalPart = raw.slice(-digitsAfterDecimal);

  return `${integerPart}.${decimalPart}`;
}

export function formatGroupedPiPrefix(prefix: string, groupSize = 10): string {
  if (!Number.isInteger(groupSize) || groupSize <= 0) {
    throw new RangeError("groupSize must be a positive integer");
  }

  const [integerPart, decimalPart] = prefix.split(".");

  if (!decimalPart) {
    return integerPart;
  }

  const groups = decimalPart.match(new RegExp(`.{1,${groupSize}}`, "g")) ?? [];

  return `${integerPart}.${groups.join(" ")}`;
}
