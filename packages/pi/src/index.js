const DEFAULT_GUARD_DIGITS = 12;
const MAX_DECIMAL_PLACES = 10_000;

/**
 * Computes a finite decimal prefix of pi using Machin's formula:
 * pi = 16 * atan(1 / 5) - 4 * atan(1 / 239).
 *
 * The infinite decimal expansion of pi has no final decimal point, so no
 * finite program can return the whole value. This function returns the exact
 * truncated prefix for the requested number of decimal places.
 *
 * @param {number} decimalPlaces number of digits after the decimal point
 * @returns {string} pi truncated to the requested decimal places
 */
export function calculatePiPrefix(decimalPlaces = 100) {
  assertDecimalPlaces(decimalPlaces);

  const scaleDigits = decimalPlaces + DEFAULT_GUARD_DIGITS;
  const scale = 10n ** BigInt(scaleDigits);
  const piScaled =
    16n * arctanInverse(5n, scale) -
    4n * arctanInverse(239n, scale);
  const truncated = piScaled / (10n ** BigInt(DEFAULT_GUARD_DIGITS));

  return formatScaledDecimal(truncated, decimalPlaces);
}

/**
 * Splits a computed pi prefix into fixed-size decimal chunks for demos or logs.
 *
 * @param {number} decimalPlaces number of digits after the decimal point
 * @param {number} chunkSize number of decimal digits per chunk
 * @returns {{ value: string, chunks: string[] }}
 */
export function calculatePiChunks(decimalPlaces = 100, chunkSize = 50) {
  assertDecimalPlaces(decimalPlaces);

  if (!Number.isInteger(chunkSize) || chunkSize <= 0) {
    throw new RangeError("chunkSize must be a positive integer");
  }

  const value = calculatePiPrefix(decimalPlaces);
  const [, fraction = ""] = value.split(".");
  const chunks = [];

  for (let index = 0; index < fraction.length; index += chunkSize) {
    chunks.push(fraction.slice(index, index + chunkSize));
  }

  return { value, chunks };
}

export function explainFinitePiComputation() {
  return [
    "Pi has an infinite non-repeating decimal expansion.",
    "A finite program can compute exact finite prefixes, not a final decimal point.",
    "This package uses integer arithmetic and Machin's formula to return deterministic truncated prefixes."
  ].join(" ");
}

function arctanInverse(inverseX, scale) {
  const inverseXSquared = inverseX * inverseX;
  let denominator = 1n;
  let term = scale / inverseX;
  let sum = term;
  let subtract = true;

  while (term !== 0n) {
    term /= inverseXSquared;
    denominator += 2n;
    const next = term / denominator;

    if (next === 0n) {
      break;
    }

    sum = subtract ? sum - next : sum + next;
    subtract = !subtract;
  }

  return sum;
}

function formatScaledDecimal(scaledValue, decimalPlaces) {
  if (decimalPlaces === 0) {
    return scaledValue.toString();
  }

  const digits = scaledValue.toString().padStart(decimalPlaces + 1, "0");
  const integer = digits.slice(0, -decimalPlaces);
  const fraction = digits.slice(-decimalPlaces);
  return `${integer}.${fraction}`;
}

function assertDecimalPlaces(decimalPlaces) {
  if (!Number.isInteger(decimalPlaces)) {
    throw new TypeError("decimalPlaces must be an integer");
  }

  if (decimalPlaces < 0 || decimalPlaces > MAX_DECIMAL_PLACES) {
    throw new RangeError(`decimalPlaces must be between 0 and ${MAX_DECIMAL_PLACES}`);
  }
}
