import { createHash } from "node:crypto";

export const KNOWN_PI_100_DIGITS =
  "3.1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679";

const DEFAULT_GUARD_DIGITS = 12;
const MAX_DIGITS = 100_000;

export type PiPrefixOptions = {
  guardDigits?: number;
};

export type PiPrefixCertificate = {
  chunkCount: number;
  chunkSize: number;
  digits: number;
  firstDigits: string;
  lastDigits: string;
  prefixLength: number;
  sha256: string;
};

export function calculatePiPrefix(digits: number, options: PiPrefixOptions = {}): string {
  assertNonNegativeInteger(digits, "digits");
  if (digits > MAX_DIGITS) {
    throw new RangeError(`digits must be ${MAX_DIGITS} or less`);
  }

  const guardDigits = options.guardDigits ?? DEFAULT_GUARD_DIGITS;
  assertNonNegativeInteger(guardDigits, "guardDigits");

  const precision = digits + guardDigits;
  const scale = 10n ** BigInt(precision);
  const piScaled =
    16n * arctanOneOver(5n, scale) - 4n * arctanOneOver(239n, scale);
  const trimmed = piScaled / (10n ** BigInt(guardDigits));
  const raw = trimmed.toString().padStart(digits + 1, "0");

  if (digits === 0) {
    return raw;
  }

  return `${raw.slice(0, 1)}.${raw.slice(1).padEnd(digits, "0")}`;
}

export function* piPrefixChunks(
  digits: number,
  chunkSize = 50,
  options: PiPrefixOptions = {}
): Generator<string> {
  assertNonNegativeInteger(chunkSize, "chunkSize");
  if (chunkSize === 0) {
    throw new RangeError("chunkSize must be greater than 0");
  }

  const prefix = calculatePiPrefix(digits, options);
  if (digits === 0) {
    yield prefix;
    return;
  }

  const [integerPart, fractionalPart = ""] = prefix.split(".");
  yield `${integerPart}.`;

  for (let offset = 0; offset < fractionalPart.length; offset += chunkSize) {
    yield fractionalPart.slice(offset, offset + chunkSize);
  }
}

export function createPiPrefixCertificate(
  digits: number,
  chunkSize = 50,
  options: PiPrefixOptions = {}
): PiPrefixCertificate {
  assertNonNegativeInteger(chunkSize, "chunkSize");
  if (chunkSize === 0) {
    throw new RangeError("chunkSize must be greater than 0");
  }

  const prefix = calculatePiPrefix(digits, options);
  const fractionalDigits = digits === 0 ? "" : prefix.split(".")[1] ?? "";
  const chunkCount =
    digits === 0 ? 1 : 1 + Math.ceil(fractionalDigits.length / chunkSize);

  return {
    chunkCount,
    chunkSize,
    digits,
    firstDigits: prefix.slice(0, 32),
    lastDigits: prefix.slice(-32),
    prefixLength: prefix.length,
    sha256: createHash("sha256").update(prefix).digest("hex")
  };
}

export function explainPiExactnessLimit(): string {
  return [
    "Pi is irrational, so its decimal expansion never terminates.",
    "A finite program can emit exact finite prefixes on demand, but there is no final decimal digit to return."
  ].join(" ");
}

function arctanOneOver(inverseX: bigint, scale: bigint): bigint {
  const inverseSquare = inverseX * inverseX;
  let powerTerm = scale / inverseX;
  let sum = powerTerm;
  let denominator = 3n;
  let sign = -1n;

  while (true) {
    powerTerm /= inverseSquare;
    const scaledTerm = powerTerm / denominator;

    if (scaledTerm === 0n) {
      return sum;
    }

    sum += sign * scaledTerm;
    sign = -sign;
    denominator += 2n;
  }
}

function assertNonNegativeInteger(value: number, name: string): void {
  if (!Number.isInteger(value) || value < 0) {
    throw new RangeError(`${name} must be a non-negative integer`);
  }
}
