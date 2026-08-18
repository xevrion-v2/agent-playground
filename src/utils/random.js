/**
 * Common random value generators.
 *
 * Exports:
 * - randomString(length) - Generates a random alphanumeric string
 * - randomInt(min, max) - Generates a random integer in [min, max]
 * - randomUUID() - Generates a v4 UUID-style string
 * - randomPick(array) - Picks a random element from an array
 */

/**
 * Generates a random alphanumeric string.
 * @param {number} length - Desired length (must be positive)
 * @returns {string} Random alphanumeric string
 */
function randomString(length) {
  if (typeof length !== 'number' || length <= 0 || !Number.isInteger(length)) {
    throw new TypeError('length must be a positive integer');
  }

  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const result = [];
  for (let i = 0; i < length; i++) {
    result.push(chars.charAt(Math.floor(Math.random() * chars.length)));
  }
  return result.join('');
}

/**
 * Generates a random integer in the inclusive range [min, max].
 * @param {number} min - Lower bound (inclusive)
 * @param {number} max - Upper bound (inclusive)
 * @returns {number} Random integer between min and max
 */
function randomInt(min, max) {
  if (typeof min !== 'number' || typeof max !== 'number') {
    throw new TypeError('min and max must be numbers');
  }
  if (!Number.isInteger(min) || !Number.isInteger(max)) {
    throw new TypeError('min and max must be integers');
  }
  if (min > max) {
    throw new RangeError('min must be less than or equal to max');
  }

  const range = max - min + 1;
  return min + Math.floor(Math.random() * range);
}

/**
 * Generates a v4 UUID-style string.
 * @returns {string} A UUID like "f47ac10b-58cc-4372-a567-0e02b2c3d479"
 */
function randomUUID() {
  const bytes = [];
  for (let i = 0; i < 16; i++) {
    bytes.push(Math.floor(Math.random() * 256).toString(16).padStart(2, '0'));
  }
  // Format: xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx (y is 8,9,a,b)
  let uuid = bytes.join('');
  uuid = uuid.slice(0, 8) + '-' + uuid.slice(8, 12) + '-4' + uuid.slice(13, 16) + '-' +
    '8' + uuid.slice(17, 20) + '-' + uuid.slice(20);
  return uuid;
}

/**
 * Picks a random element from an array.
 * @param {Array} array - The array to pick from
 * @returns {*} Random element from the array
 */
function randomPick(array) {
  if (!Array.isArray(array)) {
    throw new TypeError('array must be an array');
  }
  if (array.length === 0) {
    throw new RangeError('Cannot pick from an empty array');
  }
  return array[Math.floor(Math.random() * array.length)];
}

module.exports = { randomString, randomInt, randomUUID, randomPick };
