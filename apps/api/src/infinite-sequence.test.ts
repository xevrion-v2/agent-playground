import { infiniteSequence, take, fibonacci, primes } from './infinite-sequence';

describe('Infinite Sequence', () => {
  test('infiniteSequence generates correct values', () => {
    const seq = infiniteSequence(0, 2);
    expect(seq.next().value).toBe(0);
    expect(seq.next().value).toBe(2);
    expect(seq.next().value).toBe(4);
  });

  test('take limits generator output', () => {
    const seq = infiniteSequence(1, 1);
    expect(take(seq, 5)).toEqual([1, 2, 3, 4, 5]);
  });

  test('fibonacci generates correct sequence', () => {
    const fib = fibonacci();
    expect(take(fib, 10)).toEqual([0, 1, 1, 2, 3, 5, 8, 13, 21, 34]);
  });

  test('primes generates correct sequence', () => {
    const p = primes();
    expect(take(p, 10)).toEqual([2, 3, 5, 7, 11, 13, 17, 19, 23, 29]);
  });
});
