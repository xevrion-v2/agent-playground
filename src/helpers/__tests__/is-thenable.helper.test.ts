import { isThenable, isNativePromise, isThenableLike } from '../is-thenable.helper';

describe('isThenable', () => {
  test('returns true for Promise', () => {
    expect(isThenable(Promise.resolve())).toBe(true);
    expect(isThenable(new Promise(() => {}))).toBe(true);
  });

  test('returns true for thenable objects', () => {
    expect(isThenable({ then: () => {} })).toBe(true);
    expect(isThenable({ then: (resolve: any) => resolve() })).toBe(true);
  });

  test('returns false for non-thenable values', () => {
    expect(isThenable(null)).toBe(false);
    expect(isThenable(undefined)).toBe(false);
    expect(isThenable({})).toBe(false);
    expect(isThenable(42)).toBe(false);
    expect(isThenable('string')).toBe(false);
    expect(isThenable([])).toBe(false);
    expect(isThenable(() => {})).toBe(false);
  });
});

describe('isNativePromise', () => {
  test('returns true for native Promise', () => {
    expect(isNativePromise(Promise.resolve())).toBe(true);
    expect(isNativePromise(new Promise(() => {}))).toBe(true);
  });

  test('returns false for thenable-like objects', () => {
    expect(isNativePromise({ then: () => {} })).toBe(false);
  });
});

describe('isThenableLike', () => {
  test('returns true for thenable-like objects', () => {
    expect(isThenableLike({ then: () => {} })).toBe(true);
  });

  test('returns false for native Promises', () => {
    expect(isThenableLike(Promise.resolve())).toBe(false);
  });
});
