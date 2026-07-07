import { parseDate, formatDate, isSameDay } from '../date-parser.helper';

describe('parseDate', () => {
  test('parses valid date strings', () => {
    const result = parseDate('2024-01-01');
    expect(result).toBeInstanceOf(Date);
  });
  test('returns null for invalid inputs', () => {
    expect(parseDate(null)).toBe(null);
  });
});

describe('formatDate', () => {
  test('formats date to YYYY-MM-DD', () => {
    const date = new Date(2024, 0, 1);
    expect(formatDate(date)).toBe('2024-01-01');
  });
});

describe('isSameDay', () => {
  test('returns true for same day', () => {
    const date1 = new Date(2024, 0, 1);
    const date2 = new Date(2024, 0, 1, 12, 30);
    expect(isSameDay(date1, date2)).toBe(true);
  });
});
