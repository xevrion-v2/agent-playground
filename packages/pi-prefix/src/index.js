import { createHash } from 'node:crypto';

const DEFAULT_GUARD_DIGITS = 12;
const KNOWN_PREFIX =
  '3.1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679';

function assertSafeDigitCount(digits) {
  if (!Number.isInteger(digits) || digits < 0) {
    throw new TypeError('digits must be a non-negative integer');
  }

  if (digits > 100_000) {
    throw new RangeError('digits must be <= 100000 for a single local calculation');
  }
}

function assertChunkSize(chunkSize) {
  if (!Number.isInteger(chunkSize) || chunkSize <= 0) {
    throw new TypeError('chunkSize must be a positive integer');
  }
}

function arctanInverse(invX, scale) {
  const x = BigInt(invX);
  const xSquared = x * x;
  let xPower = scale / x;
  let sum = xPower;

  for (let denominator = 3n, subtract = true; xPower !== 0n; denominator += 2n, subtract = !subtract) {
    xPower /= xSquared;
    const term = xPower / denominator;

    if (term === 0n) {
      break;
    }

    sum = subtract ? sum - term : sum + term;
  }

  return sum;
}

export function calculatePiDigits(digits, options = {}) {
  assertSafeDigitCount(digits);

  const guardDigits = options.guardDigits ?? DEFAULT_GUARD_DIGITS;
  assertSafeDigitCount(guardDigits);

  const scale = 10n ** BigInt(digits + guardDigits);
  const piScaled =
    4n * (4n * arctanInverse(5, scale) - arctanInverse(239, scale));
  const truncated = piScaled / (10n ** BigInt(guardDigits));
  const raw = truncated.toString().padStart(digits + 1, '0');

  if (digits === 0) {
    return raw;
  }

  return `${raw.slice(0, -digits)}.${raw.slice(-digits).padStart(digits, '0')}`;
}

export function chunkPiPrefix(prefix, chunkSize = 10) {
  assertChunkSize(chunkSize);

  const digits = prefix.replace('.', '');
  const chunks = [];

  for (let index = 0; index < digits.length; index += chunkSize) {
    chunks.push({
      index: chunks.length,
      start: index,
      end: Math.min(index + chunkSize, digits.length),
      value: digits.slice(index, index + chunkSize)
    });
  }

  return chunks;
}

export function certifyPiPrefix(prefix) {
  if (typeof prefix !== 'string' || !/^\d(?:\.\d*)?$/.test(prefix)) {
    throw new TypeError('prefix must be a finite decimal string');
  }

  const normalized = prefix.endsWith('.') ? prefix.slice(0, -1) : prefix;
  const compact = normalized.replace('.', '');
  const sha256 = createHash('sha256').update(normalized).digest('hex');

  return {
    value: normalized,
    characters: normalized.length,
    numericDigits: compact.length,
    fractionalDigits: normalized.includes('.') ? normalized.split('.')[1].length : 0,
    startsWith: normalized.slice(0, Math.min(12, normalized.length)),
    endsWith: normalized.slice(Math.max(0, normalized.length - 12)),
    sha256
  };
}

export function verifyKnownPrefix(candidate = KNOWN_PREFIX) {
  const fractionalDigits = candidate.includes('.') ? candidate.split('.')[1].length : 0;
  return calculatePiDigits(fractionalDigits) === candidate;
}

export { KNOWN_PREFIX };
