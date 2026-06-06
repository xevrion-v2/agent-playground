import { InfiniteSequence } from '../infiniteSequence';

describe('InfiniteSequence', () => {
  describe('naturalNumbers', () => {
    it('should generate natural numbers starting from 0', () => {
      const seq = InfiniteSequence.naturalNumbers();
      const result = seq.take(5);
      
      expect(result).toEqual([0, 1, 2, 3, 4]);
    });

    it('should generate natural numbers starting from a custom value', () => {
      const seq = InfiniteSequence.naturalNumbers({ initialValue: 10 });
      const result = seq.take(5);
      
      expect(result).toEqual([10, 11, 12, 13, 14]);
    });
  });

  describe('fromGenerator', () => {
    it('should create sequence from custom generator', () => {
      function* evenNumberGenerator() {
        let num = 0;
        while (true) {
          yield num;
          num += 2;
        }
      }
      
      const seq = InfiniteSequence.fromGenerator(evenNumberGenerator);
      const result = seq.take(5);
      
      expect(result).toEqual([0, 2, 4, 6, 8]);
    });
  });

  describe('take', () => {
    it('should limit the number of iterations', () => {
      const seq = InfiniteSequence.naturalNumbers();
      const result = seq.take(10, 5);
      
      expect(result.length).toBe(5);
    });

    it('should handle zero count', () => {
      const seq = InfiniteSequence.naturalNumbers();
      const result = seq.take(0);
      
      expect(result).toEqual([]);
    });
  });

  describe('next', () => {
    it('should return next value in sequence', () => {
      const seq = InfiniteSequence.naturalNumbers();
      const first = seq.next();
      const second = seq.next();
      
      expect(first.value).toBe(0);
      expect(second.value).toBe(1);
    });

    it('should respect max iterations limit', () => {
      const seq = InfiniteSequence.naturalNumbers();
      const result = seq.take(2000, 100);
      
      expect(result.length).toBe(100);
    });
  });

  describe('reset', () => {
    it('should reset iteration count', () => {
      const seq = InfiniteSequence.naturalNumbers();
      seq.take(10);
      seq.reset();
      
      // After reset, we should be able to take values again
      const result = seq.take(5);
      expect(result.length).toBe(5);
    });
  });
});