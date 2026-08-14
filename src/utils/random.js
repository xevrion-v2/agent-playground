// Random utility - Generate random strings, numbers, and IDs
// Bounty issue: self-created from xevrion-v2/agent-playground #33

/**
 * Generate a random alphanumeric string of specified length.
 *
 * @param {number} [length=16] - Length of the random string (must be >= 1)
 * @returns {string} Random alphanumeric string
 *
 * @example
 * randomString(8)  // => 'aB3xK9mP'
 * randomString()   // => 'x7K9mP2aB3xK9mP2'
 */
function randomString(length = 16) {
  if (typeof length !== 'number' || length < 1 || !Number.isFinite(length)) {
    throw new Error('randomString(): length must be a positive finite number');
  }
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

/**
 * Generate a random integer between min and max (inclusive).
 *
 * @param {number} min - Minimum value
 * @param {number} max - Maximum value
 * @returns {number} Random integer
 *
 * @example
 * randomInt(1, 10)  // => 7
 * randomInt(0, 100) // => 42
 */
function randomInt(min, max) {
  if (typeof min !== 'number' || typeof max !== 'number' || !Number.isFinite(min) || !Number.isFinite(max)) {
    throw new Error('randomInt(): min and max must be finite numbers');
  }
  if (min > max) {
    throw new Error('randomInt(): min must be less than or equal to max');
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Generate a random UUID v4 string.
 *
 * @returns {string} UUID v4 string
 *
 * @example
 * randomUUID()  // => '550e8400-e29b-41d4-a716-446655440000'
 */
function randomUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

/**
 * Pick a random element from an array.
 *
 * @template T
 * @param {T[]} arr - The array to pick from
 * @returns {T|null} Random element, or null for empty array
 *
 * @example
 * randomPick(['a', 'b', 'c'])  // => 'b'
 * randomPick([])                // => null
 */
function randomPick(arr) {
  if (!Array.isArray(arr)) {
    throw new Error('randomPick(): argument must be an array');
  }
  if (arr.length === 0) return null;
  return arr[Math.floor(Math.random() * arr.length)];
}

module.exports = { randomString, randomInt, randomUUID, randomPick };
