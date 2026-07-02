import { createHash } from "node:crypto";

const ALGORITHM = "Machin formula with BigInt fixed-point arithmetic";
const DEFAULT_GUARD_DIGITS = 12;

function assertNonNegativeInteger(value, name) {
  if (!Number.isInteger(value) || value < 0) {
    throw new TypeError(`${name} must be a non-negative integer`);
  }
}

function pow10(exponent) {
  return 10n ** BigInt(exponent);
}

function arctanInverse(inverseX, scale) {
  const x = BigInt(inverseX);
  const xSquared = x * x;
  let term = scale / x;
  let sum = term;
  let denominator = 1n;
  let sign = -1n;

  while (term !== 0n) {
    term /= xSquared;
    denominator += 2n;

    if (term === 0n) {
      break;
    }

    sum += sign * (term / denominator);
    sign *= -1n;
  }

  return sum;
}

function calculatePiScaled(decimalDigits, guardDigits = DEFAULT_GUARD_DIGITS) {
  const scale = pow10(decimalDigits + guardDigits);
  const piScaled =
    16n * arctanInverse(5, scale) - 4n * arctanInverse(239, scale);

  return piScaled / pow10(guardDigits);
}

export function calculatePi(decimalDigits) {
  assertNonNegativeInteger(decimalDigits, "decimalDigits");

  const scaled = calculatePiScaled(decimalDigits).toString();

  if (decimalDigits === 0) {
    return scaled;
  }

  const padded = scaled.padStart(decimalDigits + 1, "0");
  return `${padded.slice(0, -decimalDigits)}.${padded.slice(-decimalDigits)}`;
}

export function chunkPi(decimalDigits, chunkSize = 64) {
  assertNonNegativeInteger(decimalDigits, "decimalDigits");
  if (!Number.isInteger(chunkSize) || chunkSize <= 0) {
    throw new TypeError("chunkSize must be a positive integer");
  }

  const value = calculatePi(decimalDigits);
  const chunks = [];

  for (let index = 0; index < value.length; index += chunkSize) {
    chunks.push(value.slice(index, index + chunkSize));
  }

  return chunks;
}

export function createPiCertificate(decimalDigits) {
  const value = calculatePi(decimalDigits);
  const sha256 = createHash("sha256").update(value).digest("hex");

  return {
    algorithm: ALGORITHM,
    digits: decimalDigits,
    value,
    sha256
  };
}
