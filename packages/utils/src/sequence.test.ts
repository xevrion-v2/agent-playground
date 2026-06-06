import { InfiniteSequence } from './sequence';

describe('InfiniteSequence', () => {
  describe('take', () => {
    it('generates a finite number of values', () => {
      const seq = InfiniteSequence.arithmetic(1, 1);
      const result = [...seq.take(5)];
      expect(result).toEqual([1, 2, 3, 4, 5]);
    });

    it('respects the maximum safe limit', () => {
      const seq = InfiniteSequence.arithmetic(1, 1);
      const result = [...seq.take(1_500_000)];
      expect(result.length).toBe(1_000_000);
    });

    it('works with custom generators', () => {
      const seq = new InfiniteSequence((n) => n * 2, 1);
      const result = [...seq.take(4)];
      expect(result).toEqual([2, 4, 8, 16]);
    });
  });

  describe('takeWhile', () => {
    it('yields values while predicate is true', () => {
      const seq = InfiniteSequence.arithmetic(1, 1);
      const result = [...seq.takeWhile((n) => n <= 5)];
      expect(result).toEqual([1, 2, 3, 4, 5]);
    });

    it('stops immediately when predicate fails', () => {
      const seq = InfiniteSequence.arithmetic(10, 1);
      const result = [...seq.takeWhile((n) => n < 10)];
      expect(result).toEqual([]);
    });
  });

  describe('static factories', () => {
    it('arithmetic creates correct sequence', () => {
      const seq = InfiniteSequence.arithmetic(5, 3);
      expect([...seq.take(4)]).toEqual([5, 8, 11, 14]);
    });

    it('geometric creates correct sequence', () => {
      const seq = InfiniteSequence.geometric(2, 3);
      expect([...seq.take(4)]).toEqual([2, 6, 18, 54]);
    });

    it('iterate creates custom sequence', () => {
      const seq = InfiniteSequence.iterate((x) => x + 2, 0);
      expect([...seq.take(3)]).toEqual([2, 4, 6]);
    });
  });

  describe('safety', () => {
    it('does not run infinitely when used correctly', () => {
      const seq = InfiniteSequence.arithmetic(1, 1);
      let sum = 0;
      for (const n of seq.take(100)) {
        sum += n;
      }
      expect(sum).toBe(5050);
    });
  });
});