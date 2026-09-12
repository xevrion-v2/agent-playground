const DEFAULT_GUARD_DIGITS = 12;
const MAX_DIGITS = 1000;

export function certifyPiPrefix(digits, options = {}) {
  assertSafeInteger(digits, "digits");
  if (digits > MAX_DIGITS) {
    throw new RangeError(`digits must be at most ${MAX_DIGITS}`);
  }

  const guardDigits = options.guardDigits ?? DEFAULT_GUARD_DIGITS;
  assertSafeInteger(guardDigits, "guardDigits");
  if (guardDigits < 4 || guardDigits > 24) {
    throw new RangeError("guardDigits must be between 4 and 24");
  }

  const scaleDigits = digits + guardDigits;
  const scale = 10n ** BigInt(scaleDigits);
  const arctanOneFifth = arctanOneOver(5n, scale);
  const arctanOneOver239 = arctanOneOver(239n, scale);
  const scaledPi = 16n * arctanOneFifth.value - 4n * arctanOneOver239.value;
  const uncertaintyAtGuardScale =
    16n * arctanOneFifth.uncertainty + 4n * arctanOneOver239.uncertainty + 1n;
  const lowerBound = scaledPi - uncertaintyAtGuardScale;
  const upperBound = scaledPi + uncertaintyAtGuardScale;
  const guardScale = 10n ** BigInt(guardDigits);
  const lowerPrefixUnits = lowerBound / guardScale;
  const upperPrefixUnits = upperBound / guardScale;
  const stable = lowerPrefixUnits === upperPrefixUnits;

  return {
    method: "machin-interval",
    digits,
    guardDigits,
    prefix: formatPiPrefix(scaledPi / guardScale, digits),
    stable,
    lowerBound,
    upperBound,
    uncertaintyAtGuardScale,
    termCounts: {
      arctanOneFifth: arctanOneFifth.terms,
      arctanOneOver239: arctanOneOver239.terms,
    },
  };
}

function arctanOneOver(divisor, scale) {
  let sum = 0n;
  let sign = 1n;
  let divisorPower = divisor;
  let terms = 0;

  for (let k = 0; ; k += 1) {
    const denominator = BigInt(2 * k + 1) * divisorPower;
    const term = scale / denominator;
    if (term === 0n) {
      return {
        value: sum,
        terms,
        uncertainty: BigInt(terms + 2),
      };
    }

    sum += sign * term;
    sign = -sign;
    divisorPower *= divisor * divisor;
    terms += 1;
  }
}

function formatPiPrefix(scaledPrefix, digits) {
  const raw = scaledPrefix.toString().padStart(digits + 1, "0");
  if (digits === 0) {
    return raw;
  }

  return `${raw.slice(0, -digits)}.${raw.slice(-digits)}`;
}

function assertSafeInteger(value, name) {
  if (!Number.isSafeInteger(value) || value < 0) {
    throw new TypeError(`${name} must be a non-negative integer`);
  }
}
