import { createHash } from "node:crypto";

const DEFAULT_GUARD_DIGITS = 10n;
const KNOWN_PREFIX_100 =
  "3.1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679";

function assertDigitCount(digits) {
  if (!Number.isInteger(digits) || digits < 0 || digits > 100_000) {
    throw new RangeError("digits must be an integer between 0 and 100000");
  }
}

function pow10(exponent) {
  return 10n ** BigInt(exponent);
}

function arctanInverseScaled(inverseX, scale) {
  const x = BigInt(inverseX);
  const xSquared = x * x;
  let term = scale / x;
  let sum = term;
  let denominator = 1n;
  let sign = -1n;

  while (term !== 0n) {
    term /= xSquared;
    denominator += 2n;
    const scaledTerm = term / denominator;
    sum += sign * scaledTerm;
    sign *= -1n;
  }

  return sum;
}

function formatScaledPi(scaledPi, digits) {
  const raw = scaledPi.toString().padStart(digits + 1, "0");
  if (digits === 0) {
    return raw.slice(0, 1);
  }

  return `${raw.slice(0, 1)}.${raw.slice(1)}`;
}

export function calculatePiPrefix(digits) {
  assertDigitCount(digits);
  const guardDigits = Number(DEFAULT_GUARD_DIGITS);
  const scale = pow10(digits + guardDigits);
  const piWithGuard =
    16n * arctanInverseScaled(5n, scale) - 4n * arctanInverseScaled(239n, scale);
  const piScaled = piWithGuard / pow10(guardDigits);

  return formatScaledPi(piScaled, digits);
}

export function chunkPiPrefix(prefix, chunkSize = 50) {
  if (!Number.isInteger(chunkSize) || chunkSize <= 0) {
    throw new RangeError("chunkSize must be a positive integer");
  }

  const normalized = String(prefix);
  const chunks = [];
  for (let index = 0; index < normalized.length; index += chunkSize) {
    chunks.push(normalized.slice(index, index + chunkSize));
  }
  return chunks;
}

export function createPiCertificate(digits) {
  const prefix = calculatePiPrefix(digits);
  return {
    algorithm: "Machin formula: pi = 16*atan(1/5) - 4*atan(1/239)",
    arithmetic: "BigInt integer arithmetic with guard digits; finite prefix is truncated, not rounded",
    digits,
    prefix,
    knownPrefix100Matches:
      digits <= 100 ? KNOWN_PREFIX_100.slice(0, digits + 2).startsWith(prefix) : prefix.startsWith(KNOWN_PREFIX_100),
    sha256: createHash("sha256").update(prefix).digest("hex"),
  };
}

export function explainExactPiLimit() {
  return [
    "Pi has an infinite, non-repeating decimal expansion, so no finite program output can contain its final decimal point.",
    "This package calculates exact finite decimal prefixes for any requested precision within the supported limit.",
    "Every emitted digit is derived with integer arithmetic and guard digits, then truncated to the requested prefix length.",
  ].join(" ");
}

