/**
 * An infinite sequence generator that yields consecutive numbers.
 * 
 * @param start The starting number (default: 0)
 * @param step The step increment (default: 1)
 * 
 * @example
 * // Safe iteration example using a break condition
 * const seq = infiniteSequence(1, 2);
 * for (const num of seq) {
 *   if (num > 10) break; // ALWAYS use a break condition to avoid infinite loops
 *   console.log(num); // 1, 3, 5, 7, 9
 * }
 */
export function* infiniteSequence(start: number = 0, step: number = 1): Generator<number, void, unknown> {
  let current = start;
  while (true) {
    yield current;
    current += step;
  }
}
