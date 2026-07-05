const crypto = require("node:crypto");

/**
 * Generates a random integer between min and max (inclusive).
 * If only one argument is provided, it is treated as max and min is 0.
 *
 * @param {number} min - The minimum value.
 * @param {number} [max] - The maximum value.
 * @returns {number} The random integer.
 */
function randomInt(min, max) {
  if (max === undefined) {
    max = min;
    min = 0;
  }

  if (typeof min !== "number" || typeof max !== "number" || Number.isNaN(min) || Number.isNaN(max)) {
    throw new TypeError("Arguments must be numbers");
  }

  let actualMin = min;
  let actualMax = max;

  if (actualMin > actualMax) {
    const temp = actualMin;
    actualMin = actualMax;
    actualMax = temp;
  }

  return Math.floor(Math.random() * (actualMax - actualMin + 1)) + actualMin;
}

/**
 * Generates a random alphanumeric string of a given length.
 *
 * @param {number} [length=8] - The length of the string.
 * @returns {string} The random string.
 */
function randomString(length = 8) {
  if (length === null || length === undefined) {
    length = 8;
  }

  if (typeof length !== "number" || Number.isNaN(length)) {
    throw new TypeError("Length must be a number");
  }

  if (length < 0) {
    throw new RangeError("Length must be non-negative");
  }

  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

/**
 * Generates a random UUID (v4).
 *
 * @returns {string} The generated UUID.
 */
function randomUUID() {
  return crypto.randomUUID();
}

/**
 * Picks a random element from an array.
 *
 * @param {Array} array - The array to pick from.
 * @returns {*} The randomly picked element.
 */
function randomPick(array) {
  if (!Array.isArray(array)) {
    throw new TypeError("Expected an array");
  }

  if (array.length === 0) {
    return undefined;
  }

  return array[Math.floor(Math.random() * array.length)];
}

module.exports = {
  randomInt,
  randomString,
  randomUUID,
  randomPick,
};
