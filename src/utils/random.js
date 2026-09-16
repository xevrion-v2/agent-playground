const { randomInt: cryptoRandomInt, randomUUID: cryptoRandomUUID } = require('node:crypto');

const DEFAULT_ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

function toInteger(value) {
  const number = Number(value);
  return Number.isFinite(number) ? Math.trunc(number) : undefined;
}

function randomString(length = 16, alphabet = DEFAULT_ALPHABET) {
  const size = toInteger(length);
  const characters = typeof alphabet === 'string' ? alphabet : '';

  if (size === undefined || size <= 0 || characters.length === 0) {
    return '';
  }

  let value = '';
  for (let index = 0; index < size; index += 1) {
    value += characters[cryptoRandomInt(0, characters.length)];
  }

  return value;
}

function randomInt(min, max) {
  const lowerInput = max === undefined ? 0 : min;
  const upperInput = max === undefined ? min : max;
  let lower = toInteger(lowerInput);
  let upper = toInteger(upperInput);

  if (lower === undefined || upper === undefined) {
    return undefined;
  }

  if (lower > upper) {
    [lower, upper] = [upper, lower];
  }

  return cryptoRandomInt(lower, upper + 1);
}

function randomUUID() {
  return cryptoRandomUUID();
}

function randomPick(values, fallback) {
  if (!Array.isArray(values) || values.length === 0) {
    return fallback;
  }

  return values[randomInt(0, values.length - 1)];
}

module.exports = {
  randomString,
  randomInt,
  randomUUID,
  randomPick,
};
