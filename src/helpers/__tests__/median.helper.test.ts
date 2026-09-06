import { median, safeMedian } from '../median.helper';

describe('median', () => {
  test('returns median for odd-length arrays', () => {
    expect(median([1, 2, 3])).toBe(2);
  });
  test('returns median for even-length arrays', () => {
    expect(median([1, 2, 3, 4])).toBe(2.5);
  });
  test('returns null for empty arrays', () => {
    expect(median([])).toBe(null);
  });
});

describe('safeMedian', () => {
  test('filters out non-numeric values', () => {
    expect(safeMedian([1, 2, '3', null, 4])).toBe(2.5);
  });
});
