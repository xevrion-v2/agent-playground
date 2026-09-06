// Array utility functions
// Bounty issue: self-created from xevrion-v2/agent-playground #33

/**
 * Split an array into chunks of specified size.
 * @param {T[]} arr
 * @param {number} size
 * @returns {T[][]}
 */
function chunk(arr, size) {
  if (!Array.isArray(arr)) throw new Error('chunk(): first argument must be an array');
  if (typeof size !== 'number' || size < 1 || !Number.isFinite(size)) throw new Error('chunk(): size must be a positive finite number');
  const result = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
}

/**
 * Remove duplicate values from an array.
 * @param {T[]} arr
 * @returns {T[]}
 */
function unique(arr) {
  if (!Array.isArray(arr)) throw new Error('unique(): argument must be an array');
  return [...new Set(arr)];
}

/**
 * Shuffle an array using Fisher-Yates algorithm.
 * @param {T[]} arr
 * @returns {T[]}
 */
function shuffle(arr) {
  if (!Array.isArray(arr)) throw new Error('shuffle(): argument must be an array');
  const result = [...arr];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

/**
 * Group array elements by a key function.
 * @param {T[]} arr
 * @param {(item: T) => string} fn
 * @returns {Record<string, T[]>}
 */
function groupBy(arr, fn) {
  if (!Array.isArray(arr)) throw new Error('groupBy(): first argument must be an array');
  if (typeof fn !== 'function') throw new Error('groupBy(): second argument must be a function');
  return arr.reduce((acc, item) => {
    const key = fn(item);
    if (!acc[key]) acc[key] = [];
    acc[key].push(item);
    return acc;
  }, {});
}

module.exports = { chunk, unique, shuffle, groupBy };
