/**
 * Create an infinite sequence generator starting from a given value.
 * Each call to next() advances the sequence by the step value.
 *
 * @example
 * const seq = infiniteSequence(0, 2);
 * seq.next() // { value: 0, done: false }
 * seq.next() // { value: 2, done: false }
 * seq.next() // { value: 4, done: false }
 */
export function infiniteSequence(start: number = 0, step: number = 1): Generator<number> {
  let current = start;
  function* generate(): Generator<number> {
    while (true) {
      yield current;
      current += step;
    }
  }
  return generate();
}

// Example usage:
// const seq = infiniteSequence();
// console.log(seq.next().value); // 0
// console.log(seq.next().value); // 1
// console.log(seq.next().value); // 2