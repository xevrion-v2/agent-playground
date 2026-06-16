import { infiniteSequence } from './infiniteSequence';

describe('infiniteSequence', () => {
  test('should generate infinite sequence starting from 0 by default', () => {
    const generator = infiniteSequence();
    expect(generator.next().value).toBe(0);
    expect(generator.next().value).toBe(1);
    expect(generator.next().value).toBe(2);
    expect(generator.next().value).toBe(3);
  });

  test('should generate infinite sequence starting from custom start value', () => {
    const generator = infiniteSequence(10);
    expect(generator.next().value).toBe(10);
    expect(generator.next().value).toBe(11);
    expect(generator.next().value).toBe(12);
    expect(generator.next().value).toBe(13);
  });

  test('should generate infinite sequence with negative start value', () => {
    const generator = infiniteSequence(-5);
    expect(generator.next().value).toBe(-5);
    expect(generator.next().value).toBe(-4);
    expect(generator.next().value).toBe(-3);
    expect(generator.next().value).toBe(-2);
  });

  test('should never complete', () => {
    const generator = infiniteSequence();
    for (let i = 0; i < 1000; i++) {
      const result = generator.next();
      expect(result.value).toBe(i);
      expect(result.done).toBe(false);
    }
  });
});
