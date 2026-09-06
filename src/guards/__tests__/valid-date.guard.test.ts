import { isValidDate, safeParseDate } from '../valid-date.guard';

describe('isValidDate', () => {
  test('returns true for valid Date objects', () => {
    expect(isValidDate(new Date())).toBe(true);
  });
  test('returns false for invalid values', () => {
    expect(isValidDate(null)).toBe(false);
    expect(isValidDate('invalid')).toBe(false);
  });
});

describe('safeParseDate', () => {
  test('returns Date for valid inputs', () => {
    const result = safeParseDate('2024-01-01');
    expect(result).toBeInstanceOf(Date);
  });
  test('returns null for invalid inputs', () => {
    expect(safeParseDate(null)).toBe(null);
  });
});
