/**
 * Infinite sequence iterator utilities.
 */

/**
 * Create an infinite numeric sequence starting from `start`, incrementing by `step`.
 * @param {number} start - Starting value (default 0)
 * @param {number} step - Increment per iteration (default 1)
 * @returns {Generator<number>}
 */
function* infiniteSequence(start = 0, step = 1) {
  let current = start;
  while (true) {
    yield current;
    current += step;
  }
}

/**
 * Take `n` values from an iterator.
 * @param {Iterable} iterable
 * @param {number} n
 * @returns {Array}
 */
function take(iterable, n) {
  const result = [];
  let i = 0;
  for (const value of iterable) {
    if (i >= n) break;
    result.push(value);
    i++;
  }
  return result;
}

module.exports = { infiniteSequence, take };
