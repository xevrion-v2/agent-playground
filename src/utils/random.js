const crypto = require("node:crypto");

const DEFAULT_ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

function randomString(length = 16, alphabet = DEFAULT_ALPHABET) {
  if (!Number.isInteger(length) || length < 0) {
    throw new RangeError("length must be a non-negative integer");
  }

  if (typeof alphabet !== "string" || alphabet.length === 0) {
    throw new TypeError("alphabet must be a non-empty string");
  }

  let value = "";

  for (let index = 0; index < length; index += 1) {
    value += alphabet[crypto.randomInt(0, alphabet.length)];
  }

  return value;
}

function randomInt(min, max) {
  let lower = min;
  let upper = max;

  if (max === undefined) {
    lower = 0;
    upper = min;
  }

  if (!Number.isInteger(lower) || !Number.isInteger(upper)) {
    throw new TypeError("min and max must be integers");
  }

  if (upper <= lower) {
    throw new RangeError("max must be greater than min");
  }

  return crypto.randomInt(lower, upper);
}

function randomUUID() {
  return crypto.randomUUID();
}

function randomPick(items) {
  if (!Array.isArray(items)) {
    throw new TypeError("items must be an array");
  }

  if (items.length === 0) {
    return undefined;
  }

  return items[randomInt(items.length)];
}

module.exports = {
  randomString,
  randomInt,
  randomUUID,
  randomPick,
};
