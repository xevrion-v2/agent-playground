import { randomInt as cryptoRandomInt, randomUUID as cryptoRandomUUID } from "node:crypto";

const DEFAULT_ALPHABET = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

function normalizedBounds(min, max) {
  if (max === undefined) {
    max = min;
    min = 0;
  }

  if (!Number.isInteger(min) || !Number.isInteger(max) || max < min) {
    return null;
  }

  return { min, max };
}

export function randomString(length, alphabet = DEFAULT_ALPHABET) {
  if (!Number.isInteger(length) || length < 0 || typeof alphabet !== "string" || alphabet.length === 0) {
    return "";
  }

  let value = "";
  for (let index = 0; index < length; index += 1) {
    value += alphabet[cryptoRandomInt(alphabet.length)];
  }

  return value;
}

export function randomInt(min, max) {
  const bounds = normalizedBounds(min, max);
  if (!bounds) {
    return null;
  }

  return cryptoRandomInt(bounds.min, bounds.max + 1);
}

export function randomUUID() {
  return cryptoRandomUUID();
}

export function randomPick(values) {
  if (!Array.isArray(values) || values.length === 0) {
    return undefined;
  }

  return values[cryptoRandomInt(values.length)];
}

export default {
  randomString,
  randomInt,
  randomUUID,
  randomPick,
};
