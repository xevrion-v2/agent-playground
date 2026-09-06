import { calculatePi } from './pi';

describe('calculatePi', () => {
  it('starts with 3.14159', () => {
    expect(calculatePi(10)).toBe('3.1415926535');
  });
  it('handles 0 decimals', () => {
    expect(calculatePi(0)).toBe('3.');
  });
});
