import { parseIntSafe, parseIntOrThrow, isValidInteger } from '../integer-parser.helper';

describe('parseIntSafe', () => {
  test('parses valid integer strings', () => {
    expect(parseIntSafe('42')).toBe(42);
    expect(parseIntSafe('0')).toBe(0);
    expect(parseIntSafe('-42')).toBe(-42);
  });

  test('handles hex strings with radix', () => {
    expect(parseIntSafe('FF', { radix: 16 })).toBe(255);
    expect(parseIntSafe('0xFF', { radix: 16 })).toBe(255);
  });

  test('handles binary strings with radix', () => {
    expect(parseIntSafe('1010', { radix: 2 })).toBe(10);
  });

  test('handles floating point numbers', () => {
    expect(parseIntSafe('42.5')).toBe(42);
    expect(parseIntSafe('42.5', { allowFloat: true })).toBe(42);
    expect(parseIntSafe(42.5)).toBe(42);
  });

  test('handles boolean values', () => {
    expect(parseIntSafe(true)).toBe(1);
    expect(parseIntSafe(false)).toBe(0);
  });

  test('handles invalid inputs with fallback', () => {
    expect(parseIntSafe(null)).toBe(null);
    expect(parseIntSafe(undefined)).toBe(null);
    expect(parseIntSafe('invalid')).toBe(null);
    expect(parseIntSafe('')).toBe(null);
    expect(parseIntSafe('   ')).toBe(null);
    expect(parseIntSafe(NaN)).toBe(null);
    expect(parseIntSafe(Infinity)).toBe(null);
    expect(parseIntSafe(null, { fallback: 0 })).toBe(0);
    expect(parseIntSafe('invalid', { fallback: 0 })).toBe(0);
  });

  test('handles arrays', () => {
    expect(parseIntSafe([1])).toBe(1);
    expect(parseIntSafe([])).toBe(null);
  });
});

describe('parseIntOrThrow', () => {
  test('returns number for valid inputs', () => {
    expect(parseIntOrThrow('42')).toBe(42);
  });

  test('throws for invalid inputs', () => {
    expect(() => parseIntOrThrow('invalid')).toThrow();
    expect(() => parseIntOrThrow(null)).toThrow();
  });
});

describe('isValidInteger', () => {
  test('returns true for valid integers', () => {
    expect(isValidInteger('42')).toBe(true);
    expect(isValidInteger(42)).toBe(true);
    expect(isValidInteger(true)).toBe(true);
  });

  test('returns false for invalid integers', () => {
    expect(isValidInteger(null)).toBe(false);
    expect(isValidInteger('invalid')).toBe(false);
    expect(isValidInteger(NaN)).toBe(false);
  });
});
