import { createHash } from "node:crypto";

const KNOWN_100 =
  "3.1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679";

function assertDecimalPlaces(decimalPlaces) {
  if (!Number.isSafeInteger(decimalPlaces) || decimalPlaces < 0) {
    throw new TypeError("decimalPlaces must be a non-negative safe integer");
  }
}

function atanInverse(inv, scale) {
  const invBig = BigInt(inv);
  const invSquared = invBig * invBig;
  let term = scale / invBig;
  let sum = term;
  let denominator = 3n;
  let subtract = true;

  while (term !== 0n) {
    term /= invSquared;
    if (term === 0n) {
      break;
    }

    const fraction = term / denominator;
    sum = subtract ? sum - fraction : sum + fraction;
    subtract = !subtract;
    denominator += 2n;
  }

  return sum;
}

export function calculatePiPrefix(decimalPlaces) {
  assertDecimalPlaces(decimalPlaces);

  const guardDigits = 20n;
  const scaledPlaces = BigInt(decimalPlaces) + guardDigits;
  const scale = 10n ** scaledPlaces;
  const piScaled = 4n * (4n * atanInverse(5, scale) - atanInverse(239, scale));
  const unguarded = piScaled / 10n ** guardDigits;
  const raw = unguarded.toString().padStart(decimalPlaces + 1, "0");

  if (decimalPlaces === 0) {
    return raw;
  }

  return `${raw[0]}.${raw.slice(1).padEnd(decimalPlaces, "0")}`;
}

export function chunkPiPrefix(decimalPlaces, chunkSize = 50) {
  assertDecimalPlaces(decimalPlaces);
  if (!Number.isSafeInteger(chunkSize) || chunkSize <= 0) {
    throw new TypeError("chunkSize must be a positive safe integer");
  }

  const prefix = calculatePiPrefix(decimalPlaces);
  const normalized = prefix.replace(".", "");
  const chunks = [];

  for (let offset = 0; offset < normalized.length; offset += chunkSize) {
    chunks.push(normalized.slice(offset, offset + chunkSize));
  }

  return chunks;
}

export function certifyPiPrefix(decimalPlaces, chunkSize = 50) {
  const prefix = calculatePiPrefix(decimalPlaces);
  const chunks = chunkPiPrefix(decimalPlaces, chunkSize);
  const knownPrefix = KNOWN_100.slice(0, Math.min(KNOWN_100.length, prefix.length));

  return {
    algorithm: "Machin arctangent series with BigInt fixed-point arithmetic",
    decimalPlaces,
    prefix,
    chunks,
    digitCount: prefix.replace(".", "").length,
    matchesKnownPrefix: prefix.startsWith(knownPrefix),
    knownPrefixCompared: knownPrefix.length,
    sha256: createHash("sha256").update(prefix).digest("hex"),
    exactInfiniteValueAvailable: false,
    note:
      "PI is irrational and has no final decimal digit; this certificate verifies a finite decimal prefix."
  };
}

export const knownPi100 = KNOWN_100;
