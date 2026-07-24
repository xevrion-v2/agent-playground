import { createHash } from "node:crypto";

const MAX_DIGITS = 100_000;

function assertDigitCount(digits) {
  if (!Number.isInteger(digits) || digits < 0 || digits > MAX_DIGITS) {
    throw new RangeError(
      `digits must be an integer between 0 and ${MAX_DIGITS}`
    );
  }
}

function pow10(exponent) {
  return 10n ** BigInt(exponent);
}

function arctanInverse(invX, scale) {
  const x = BigInt(invX);
  const xSquared = x * x;
  let term = scale / x;
  let sum = term;
  let denominator = 3n;
  let sign = -1n;

  while (term !== 0n) {
    term /= xSquared;
    const contribution = term / denominator;

    if (contribution === 0n) {
      break;
    }

    sum += sign * contribution;
    sign *= -1n;
    denominator += 2n;
  }

  return sum;
}

export function calculatePiPrefix(digits = 100) {
  assertDigitCount(digits);

  const guardDigits = Math.max(12, Math.ceil(digits / 8));
  const scale = pow10(digits + guardDigits);
  const piScaled =
    16n * arctanInverse(5, scale) - 4n * arctanInverse(239, scale);
  const trimmed = piScaled / pow10(guardDigits);

  if (digits === 0) {
    return (trimmed / pow10(0)).toString();
  }

  const decimalScale = pow10(digits);
  const whole = trimmed / decimalScale;
  const fractional = (trimmed % decimalScale).toString().padStart(digits, "0");

  return `${whole}.${fractional}`;
}

export function chunkPiPrefix(prefix, chunkSize = 50) {
  if (!Number.isInteger(chunkSize) || chunkSize <= 0) {
    throw new RangeError("chunkSize must be a positive integer");
  }

  const [whole, fractional = ""] = prefix.split(".");
  const chunks = [];

  for (let index = 0; index < fractional.length; index += chunkSize) {
    chunks.push(fractional.slice(index, index + chunkSize));
  }

  return { whole, chunks };
}

export function createPiCertificate(digits = 100) {
  const prefix = calculatePiPrefix(digits);
  const hash = createHash("sha256").update(prefix).digest("hex");

  return {
    digits,
    prefix,
    decimalDigits: digits,
    sha256: hash
  };
}
