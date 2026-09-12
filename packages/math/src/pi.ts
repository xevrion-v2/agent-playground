const DEFAULT_GUARD_DIGITS = 10;
const MAX_DECIMAL_PLACES = 10_000;

function assertDecimalPlaces(decimalPlaces: number): void {
  if (!Number.isInteger(decimalPlaces)) {
    throw new TypeError("decimalPlaces must be an integer");
  }

  if (decimalPlaces < 0) {
    throw new RangeError("decimalPlaces must be greater than or equal to 0");
  }

  if (decimalPlaces > MAX_DECIMAL_PLACES) {
    throw new RangeError(`decimalPlaces must be ${MAX_DECIMAL_PLACES} or fewer`);
  }
}

function arctanScaled(inverseX: bigint, scale: bigint): bigint {
  const inverseXSquared = inverseX * inverseX;
  let term = scale / inverseX;
  let sum = term;
  let denominator = 3n;
  let subtract = true;

  while (term !== 0n) {
    term /= inverseXSquared;
    const scaledTerm = term / denominator;

    if (scaledTerm === 0n) {
      break;
    }

    sum = subtract ? sum - scaledTerm : sum + scaledTerm;
    subtract = !subtract;
    denominator += 2n;
  }

  return sum;
}

function pow10(exponent: number): bigint {
  return 10n ** BigInt(exponent);
}

export function calculatePiPrefix(decimalPlaces: number): string {
  assertDecimalPlaces(decimalPlaces);

  const workingScale = pow10(decimalPlaces + DEFAULT_GUARD_DIGITS);
  const guardScale = pow10(DEFAULT_GUARD_DIGITS);

  // Machin's formula: pi / 4 = 4 * arctan(1/5) - arctan(1/239).
  // Every operation is integer-scaled, so the returned finite prefix is
  // deterministic and does not depend on floating point rounding.
  const piWorking = 16n * arctanScaled(5n, workingScale) - 4n * arctanScaled(239n, workingScale);
  const piScaled = piWorking / guardScale;

  if (decimalPlaces === 0) {
    return (piScaled / pow10(0)).toString();
  }

  const scale = pow10(decimalPlaces);
  const integerPart = piScaled / scale;
  const fractionalPart = (piScaled % scale).toString().padStart(decimalPlaces, "0");

  return `${integerPart}.${fractionalPart}`;
}

export function explainPiPrefixLimit(): string {
  return [
    "Pi has an infinite non-repeating decimal expansion, so no finite program can emit its complete exact value.",
    "This utility returns exact finite decimal prefixes for requested precision using integer arithmetic."
  ].join(" ");
}
