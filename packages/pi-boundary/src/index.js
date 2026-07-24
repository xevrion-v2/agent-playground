import { createHash } from 'node:crypto';

export const KNOWN_PI_100 =
  '3.1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679';

const MAX_DIGITS = 20000;
const DEFAULT_GUARD_DIGITS = 12;

function parseDigits(value) {
  if (!Number.isInteger(value) || value < 0 || value > MAX_DIGITS) {
    throw new RangeError(`digits must be an integer from 0 to ${MAX_DIGITS}`);
  }
  return value;
}

function arctanInverse(invX, scale) {
  const x = BigInt(invX);
  const xSquared = x * x;
  let term = scale / x;
  let sum = term;
  let denominator = 3n;
  let subtract = true;

  while (term !== 0n) {
    term /= xSquared;
    const next = term / denominator;
    if (next === 0n) {
      break;
    }
    sum = subtract ? sum - next : sum + next;
    subtract = !subtract;
    denominator += 2n;
  }

  return sum;
}

export function calculatePiPrefix(digits, options = {}) {
  const requestedDigits = parseDigits(digits);
  const guardDigits = options.guardDigits ?? DEFAULT_GUARD_DIGITS;
  if (!Number.isInteger(guardDigits) || guardDigits < 8 || guardDigits > 40) {
    throw new RangeError('guardDigits must be an integer from 8 to 40');
  }

  const scale = 10n ** BigInt(requestedDigits + guardDigits);
  const piScaled = 16n * arctanInverse(5, scale) - 4n * arctanInverse(239, scale);
  const trimmed = piScaled / (10n ** BigInt(guardDigits));
  const raw = trimmed.toString().padStart(requestedDigits + 1, '0');

  if (requestedDigits === 0) {
    return raw;
  }

  return `${raw[0]}.${raw.slice(1)}`;
}

export function chunkDecimalPrefix(prefix, chunkSize = 10) {
  if (!Number.isInteger(chunkSize) || chunkSize < 1 || chunkSize > 100) {
    throw new RangeError('chunkSize must be an integer from 1 to 100');
  }

  const [integerPart, fraction = ''] = prefix.split('.');
  const chunks = [];
  for (let index = 0; index < fraction.length; index += chunkSize) {
    chunks.push(fraction.slice(index, index + chunkSize));
  }

  return {
    integerPart,
    chunkSize,
    chunks,
    formatted: chunks.length === 0 ? integerPart : `${integerPart}.${chunks.join(' ')}`
  };
}

export function buildPiCertificate(digits, options = {}) {
  const prefix = calculatePiPrefix(digits, options);
  const digest = createHash('sha256').update(prefix).digest('hex');
  const knownPrefixMatches =
    digits <= 100 ? KNOWN_PI_100.startsWith(prefix) : prefix.startsWith(KNOWN_PI_100);

  return {
    algorithm: 'Machin formula with BigInt fixed-point arithmetic',
    digits,
    prefix,
    sha256: digest,
    knownPrefixMatches,
    boundary:
      'Pi is irrational and has no final decimal digit; this package returns exact finite decimal prefixes only.'
  };
}

export function explainNoFinalDigit() {
  return [
    'The bounty title asks for the exact value of pi up to the very last decimal point.',
    'That final decimal point does not exist: pi is irrational, so its decimal expansion is infinite and non-repeating.',
    'This package therefore implements the meaningful finite version of the task: exact prefixes for requested precision.'
  ].join(' ');
}
