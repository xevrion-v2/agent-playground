import { infiniteSequence, infiniteCycle } from '../infinite-sequence';

describe('infiniteSequence', () => {
  it('generates numbers starting from default 0 with step 1', () => {
    const gen = infiniteSequence();
    expect(gen.next().value).toBe(0);
    expect(gen.next().value).toBe(1);
    expect(gen.next().value).toBe(2);
  });

  it('generates numbers with custom start and step', () => {
    const gen = infiniteSequence(10, 5);
    expect(gen.next().value).toBe(10);
    expect(gen.next().value).toBe(15);
    expect(gen.next().value).toBe(20);
  });

  it('respects maxIterations limit', () => {
    const gen = infiniteSequence(0, 1, { maxIterations: 3 });
    expect(gen.next().value).toBe(0);
    expect(gen.next().value).toBe(1);
    expect(gen.next().value).toBe(2);
    expect(() => gen.next()).toThrow('safety limit reached');
  });

  it('works with for...of when broken early', () => {
    const results: number[] = [];
    for (const num of infiniteSequence(0, 1, { maxIterations: 100 })) {
      results.push(num);
      if (num >= 5) break;
    }
    expect(results).toEqual([0, 1, 2, 3, 4, 5]);
  });
});

describe('infiniteCycle', () => {
  it('cycles through items repeatedly', () => {
    const gen = infiniteCycle(['a', 'b', 'c']);
    expect(gen.next().value).toBe('a');
    expect(gen.next().value).toBe('b');
    expect(gen.next().value).toBe('c');
    expect(gen.next().value).toBe('a');
    expect(gen.next().value).toBe('b');
  });

  it('throws on empty array', () => {
    expect(() => infiniteCycle([])).toThrow('empty array');
  });

  it('respects maxIterations limit', () => {
    const gen = infiniteCycle(['a', 'b'], { maxIterations: 3 });
    expect(gen.next().value).toBe('a');
    expect(gen.next().value).toBe('b');
    expect(gen.next().value).toBe('a');
    expect(() => gen.next()).toThrow('safety limit reached');
  });

  it('works with for...of when broken early', () => {
    const results: string[] = [];
    for (const item of infiniteCycle(['x', 'y'], { maxIterations: 100 })) {
      results.push(item);
      if (results.length >= 5) break;
    }
    expect(results).toEqual(['x', 'y', 'x', 'y', 'x']);
  });
});
