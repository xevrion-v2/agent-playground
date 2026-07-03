import { toSimpleLog, toSimpleLogSafe, toLogString } from '../simple-log.guard';

describe('toSimpleLog', () => {
  test('converts primitive values', () => {
    expect(toSimpleLog(42)).toEqual({ value: 42 });
    expect(toSimpleLog('hello')).toEqual({ value: 'hello' });
    expect(toSimpleLog(true)).toEqual({ value: true });
  });

  test('handles null and undefined', () => {
    expect(toSimpleLog(null)).toEqual({ value: null });
    expect(toSimpleLog(undefined)).toEqual({ value: undefined });
  });

  test('converts simple objects', () => {
    const result = toSimpleLog({ name: 'John', age: 30 });
    expect(result).toEqual({ name: 'John', age: 30 });
  });

  test('flattens nested objects', () => {
    const result = toSimpleLog({ user: { name: 'John', age: 30 } });
    expect(result).toEqual({ 'user.name': 'John', 'user.age': 30 });
  });

  test('handles arrays', () => {
    const result = toSimpleLog([1, 2, 3]);
    expect(result).toEqual({ '[0]': 1, '[1]': 2, '[2]': 3 });
  });

  test('handles arrays with objects', () => {
    const result = toSimpleLog([{ name: 'John' }, { name: 'Jane' }]);
    expect(result).toEqual({
      '[0].name': 'John',
      '[1].name': 'Jane'
    });
  });

  test('handles custom separator', () => {
    const result = toSimpleLog({ user: { name: 'John' } }, { separator: '_' });
    expect(result).toEqual({ 'user_name': 'John' });
  });

  test('handles maxDepth', () => {
    const deep = { a: { b: { c: { d: { e: 'value' } } } } };
    const result = toSimpleLog(deep, { maxDepth: 2 });
    expect(result).toEqual({ 'a.b.c': '[Max Depth]' });
  });

  test('handles flatten false', () => {
    const result = toSimpleLog({ user: { name: 'John' } }, { flatten: false });
    expect(result).toEqual({ user: { name: 'John' } });
  });

  test('handles fallback', () => {
    const result = toSimpleLog(undefined, { fallback: { default: 'empty' } });
    expect(result).toEqual({ value: undefined });
  });
});

describe('toSimpleLogSafe', () => {
  test('returns object for valid inputs', () => {
    expect(toSimpleLogSafe({ name: 'John' })).toEqual({ name: 'John' });
  });

  test('returns null for invalid inputs', () => {
    expect(toSimpleLogSafe(null)).toBe(null);
  });
});

describe('toLogString', () => {
  test('returns JSON string for valid inputs', () => {
    const result = toLogString({ name: 'John' });
    expect(result).toContain('"name": "John"');
  });

  test('handles invalid inputs', () => {
    expect(toLogString(null)).toBe('null');
  });
});
