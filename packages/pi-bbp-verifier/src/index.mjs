import { createHash } from "node:crypto";

export const PI_100_DIGIT_PREFIX =
  "3.1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679";

const HEX_DIGITS = "0123456789ABCDEF";

function assertNonNegativeInteger(value, name) {
  if (!Number.isInteger(value) || value < 0) {
    throw new RangeError(`${name} must be a non-negative integer`);
  }
}

function pow10(exponent) {
  return 10n ** BigInt(exponent);
}

function atanInverse(invX, scale) {
  const x = BigInt(invX);
  const xSquared = x * x;
  let term = scale / x;
  let sum = term;
  let sign = -1n;
  let index = 1n;

  while (term > 0n) {
    term /= xSquared;
    const addend = term / (2n * index + 1n);

    if (addend === 0n) {
      break;
    }

    sum += sign * addend;
    sign = -sign;
    index += 1n;
  }

  return sum;
}

export function computePiDecimalPrefix(decimalDigits) {
  assertNonNegativeInteger(decimalDigits, "decimalDigits");

  const guardDigits = Math.max(20, Math.ceil(decimalDigits / 10));
  const scale = pow10(decimalDigits + guardDigits);
  const piScaled = 16n * atanInverse(5, scale) - 4n * atanInverse(239, scale);
  const prefixInteger = piScaled / pow10(guardDigits);

  if (decimalDigits === 0) {
    return prefixInteger.toString();
  }

  const raw = prefixInteger.toString().padStart(decimalDigits + 1, "0");
  const whole = raw.slice(0, raw.length - decimalDigits);
  const fraction = raw.slice(raw.length - decimalDigits);
  return `${whole}.${fraction}`;
}

function modPow(base, exponent, modulus) {
  let result = 1n;
  let factor = BigInt(base) % BigInt(modulus);
  let remaining = BigInt(exponent);
  const mod = BigInt(modulus);

  while (remaining > 0n) {
    if (remaining & 1n) {
      result = (result * factor) % mod;
    }

    factor = (factor * factor) % mod;
    remaining >>= 1n;
  }

  return Number(result);
}

function bbpSeries(j, position) {
  let sum = 0;

  for (let k = 0; k <= position; k += 1) {
    const denominator = 8 * k + j;
    sum = (sum + modPow(16, position - k, denominator) / denominator) % 1;
  }

  for (let k = position + 1; ; k += 1) {
    const term = Math.pow(16, position - k) / (8 * k + j);

    if (term < 1e-17) {
      break;
    }

    sum = (sum + term) % 1;
  }

  return sum;
}

export function computePiHexDigit(position) {
  assertNonNegativeInteger(position, "position");

  let value =
    4 * bbpSeries(1, position) -
    2 * bbpSeries(4, position) -
    bbpSeries(5, position) -
    bbpSeries(6, position);

  value -= Math.floor(value);
  return HEX_DIGITS[Math.floor(16 * value)];
}

export function computePiHexPrefix(hexDigits) {
  assertNonNegativeInteger(hexDigits, "hexDigits");

  let prefix = "";
  for (let position = 0; position < hexDigits; position += 1) {
    prefix += computePiHexDigit(position);
  }
  return prefix;
}

export function createPiCertificate(decimalDigits = 100, hexDigits = 32) {
  assertNonNegativeInteger(decimalDigits, "decimalDigits");
  assertNonNegativeInteger(hexDigits, "hexDigits");

  const decimalPrefix = computePiDecimalPrefix(decimalDigits);
  const bbpHexPrefix = computePiHexPrefix(hexDigits);
  const payload = JSON.stringify({
    decimalDigits,
    hexDigits,
    decimalPrefix,
    bbpHexPrefix
  });

  return {
    decimalDigits,
    hexDigits,
    decimalPrefix,
    bbpHexPrefix,
    sha256: createHash("sha256").update(payload).digest("hex"),
    note:
      "Pi has no final decimal digit; this certificate records exact requested finite prefixes plus an independent BBP hexadecimal check."
  };
}
