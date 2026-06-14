import { createHash } from "node:crypto";

export const KNOWN_PI_100 =
  "3.1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679";

const DEFAULT_GUARD_DIGITS = 12;
const MAX_DECIMAL_PLACES = 5000;

function assertDecimalPlaces(decimalPlaces) {
  if (!Number.isInteger(decimalPlaces)) {
    throw new TypeError("decimalPlaces must be an integer");
  }

  if (decimalPlaces < 0 || decimalPlaces > MAX_DECIMAL_PLACES) {
    throw new RangeError(`decimalPlaces must be between 0 and ${MAX_DECIMAL_PLACES}`);
  }
}

function pow10(exponent) {
  return 10n ** BigInt(exponent);
}

function arctanInverseFixed(inverse, scale) {
  const inverseBigInt = BigInt(inverse);
  const inverseSquared = inverseBigInt * inverseBigInt;
  let power = scale / inverseBigInt;
  let result = power;
  let sign = -1n;

  for (let denominator = 3n; ; denominator += 2n) {
    power /= inverseSquared;

    if (power === 0n) {
      break;
    }

    const term = power / denominator;

    if (term === 0n) {
      break;
    }

    result += sign * term;
    sign *= -1n;
  }

  return result;
}

function formatScaledPi(piScaled, decimalPlaces) {
  const scale = pow10(decimalPlaces);
  const whole = piScaled / scale;
  const fraction = piScaled % scale;

  if (decimalPlaces === 0) {
    return whole.toString();
  }

  return `${whole.toString()}.${fraction.toString().padStart(decimalPlaces, "0")}`;
}

export function calculatePiPrefix(decimalPlaces, options = {}) {
  assertDecimalPlaces(decimalPlaces);

  const guardDigits = options.guardDigits ?? DEFAULT_GUARD_DIGITS;

  if (!Number.isInteger(guardDigits) || guardDigits < 4 || guardDigits > 32) {
    throw new RangeError("guardDigits must be an integer between 4 and 32");
  }

  const workingPlaces = decimalPlaces + guardDigits;
  const workingScale = pow10(workingPlaces);
  const piWorkingScale =
    16n * arctanInverseFixed(5, workingScale) -
    4n * arctanInverseFixed(239, workingScale);
  const truncated = piWorkingScale / pow10(guardDigits);

  return formatScaledPi(truncated, decimalPlaces);
}

export function chunkPiPrefix(value, groupSize = 10) {
  if (!Number.isInteger(groupSize) || groupSize < 1 || groupSize > 80) {
    throw new RangeError("groupSize must be an integer between 1 and 80");
  }

  const [whole, fraction = ""] = value.split(".");

  if (fraction.length === 0) {
    return [whole];
  }

  const chunks = [];

  for (let index = 0; index < fraction.length; index += groupSize) {
    chunks.push(fraction.slice(index, index + groupSize));
  }

  return [`${whole}.${chunks[0]}`, ...chunks.slice(1)];
}

export function buildPiCertificate(decimalPlaces, options = {}) {
  const value = calculatePiPrefix(decimalPlaces, options);
  const sha256 = createHash("sha256").update(value, "utf8").digest("hex");
  const knownPrefix = KNOWN_PI_100.slice(0, Math.min(KNOWN_PI_100.length, value.length));

  return {
    algorithm: "Machin formula with BigInt fixed-point arithmetic",
    decimalPlaces,
    guardDigits: options.guardDigits ?? DEFAULT_GUARD_DIGITS,
    value,
    chunks: chunkPiPrefix(value, options.groupSize ?? 10),
    knownPrefixMatched: value.startsWith(knownPrefix),
    sha256,
    note:
      "Pi is irrational, so this certificate proves a requested finite prefix, not a final decimal expansion."
  };
}

export function explainFinitePiTarget() {
  return "A finite program cannot emit pi to a final decimal digit because pi is irrational; it can emit exact finite prefixes for requested precisions.";
}
