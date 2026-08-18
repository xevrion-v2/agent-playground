import { formatPercentage, safeFormatPercentage } from '../percentage.helper';

describe('formatPercentage', () => {
  test('formats basic percentages', () => {
    expect(formatPercentage(0.5)).toBe('50%');
    expect(formatPercentage(1)).toBe('100%');
    expect(formatPercentage(0)).toBe('0%');
  });

  test('handles decimal places', () => {
    expect(formatPercentage(0.1234, { decimals: 2 })).toBe('12.34%');
    expect(formatPercentage(0.1234, { decimals: 1 })).toBe('12.3%');
  });

  test('handles rounding', () => {
    expect(formatPercentage(0.9999, { decimals: 2, round: true })).toBe('100%');
    expect(formatPercentage(0.9999, { decimals: 2, round: false })).toBe('99.99%');
  });

  test('handles invalid inputs with fallback', () => {
    expect(formatPercentage(null)).toBe('0%');
    expect(formatPercentage(undefined)).toBe('0%');
    expect(formatPercentage('invalid')).toBe('0%');
    expect(formatPercentage(NaN)).toBe('0%');
    expect(formatPercentage(Infinity)).toBe('0%');
    expect(formatPercentage(null, { fallback: 'N/A' })).toBe('N/A');
  });
});

describe('safeFormatPercentage', () => {
  test('returns string for valid inputs', () => {
    expect(safeFormatPercentage(0.5)).toBe('50%');
  });

  test('returns null for invalid inputs', () => {
    expect(safeFormatPercentage(null)).toBe(null);
    expect(safeFormatPercentage(undefined)).toBe(null);
    expect(safeFormatPercentage('invalid')).toBe(null);
  });
});
