const DEFAULT_GUARD_DIGITS = 20;

export const KNOWN_PI_100 =
  "3.1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679";

function assertDecimalPlaces(decimalPlaces) {
  if (!Number.isSafeInteger(decimalPlaces)) {
    throw new TypeError("decimalPlaces must be a safe integer.");
  }

  if (decimalPlaces < 0) {
    throw new RangeError("decimalPlaces must be greater than or equal to 0.");
  }
}

function pow10(exponent) {
  return 10n ** BigInt(exponent);
}

function arctanInverse(invX, scale) {
  const x = BigInt(invX);
  const xSquared = x * x;
  let numerator = scale / x;
  let sum = numerator;
  let sign = -1n;

  for (let termIndex = 1n; numerator !== 0n; termIndex += 1n) {
    numerator /= xSquared;
    const term = numerator / (2n * termIndex + 1n);

    if (term === 0n) {
      break;
    }

    sum += sign * term;
    sign = -sign;
  }

  return sum;
}

function formatScaledPi(scaledPi, decimalPlaces) {
  if (decimalPlaces === 0) {
    return scaledPi.toString();
  }

  const padded = scaledPi.toString().padStart(decimalPlaces + 1, "0");
  const integerPart = padded.slice(0, -decimalPlaces);
  const fractionalPart = padded.slice(-decimalPlaces);
  return `${integerPart}.${fractionalPart}`;
}

export function calculatePi(decimalPlaces = 100, options = {}) {
  assertDecimalPlaces(decimalPlaces);

  const guardDigits = options.guardDigits ?? DEFAULT_GUARD_DIGITS;
  assertDecimalPlaces(guardDigits);

  const workingScale = pow10(decimalPlaces + guardDigits);
  const scaledWithGuard =
    16n * arctanInverse(5, workingScale) -
    4n * arctanInverse(239, workingScale);
  const scaledPi = scaledWithGuard / pow10(guardDigits);

  return formatScaledPi(scaledPi, decimalPlaces);
}

export function calculatePiDigits(decimalPlaces = 100, options = {}) {
  const pi = calculatePi(decimalPlaces, options);
  const decimalPoint = pi.indexOf(".");

  return decimalPoint === -1 ? "" : pi.slice(decimalPoint + 1);
}
