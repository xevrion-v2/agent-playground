import { calculatePiChudnovsky, calculatePiBBP, calculatePiLeibniz, calculatePiMachin, getPi, verifyPi } from '../pi-calculator';

describe('PI Calculator', () => {
  describe('calculatePiChudnovsky', () => {
    it('should calculate PI to 10 decimal places', () => {
      const result = calculatePiChudnovsky(10);
      expect(result).toBe('3.1415926535');
    });

    it('should calculate PI to 50 decimal places', () => {
      const result = calculatePiChudnovsky(50);
      expect(result).toBe('3.14159265358979323846264338327950288419716939937510');
    });

    it('should calculate PI to 100 decimal places', () => {
      const result = calculatePiChudnovsky(100);
      expect(result).toBe('3.1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679');
    });

    it('should return 3 for 0 digits', () => {
      const result = calculatePiChudnovsky(0);
      expect(result).toBe('3');
    });
  });

  describe('calculatePiBBP', () => {
    it('should calculate first hex digit of PI', () => {
      const digit = calculatePiBBP(0);
      expect(digit).toBe(3);
    });

    it('should calculate second hex digit of PI', () => {
      const digit = calculatePiBBP(1);
      expect(digit).toBe(1);
    });

    it('should calculate third hex digit of PI', () => {
      const digit = calculatePiBBP(2);
      expect(digit).toBe(4);
    });
  });

  describe('calculatePiLeibniz', () => {
    it('should approximate PI with enough iterations', () => {
      const result = calculatePiLeibniz(1000000);
      expect(result).toBeCloseTo(Math.PI, 4);
    });
  });

  describe('calculatePiMachin', () => {
    it('should calculate PI to 10 decimal places', () => {
      const result = calculatePiMachin(10);
      expect(result).toBe('3.1415926535');
    });
  });

  describe('getPi', () => {
    it('should return pre-computed PI for common cases', () => {
      expect(getPi(0)).toBe('3');
      expect(getPi(1)).toBe('3.1');
      expect(getPi(10)).toBe('3.1415926535');
      expect(getPi(100)).toBe('3.1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679');
    });

    it('should calculate PI for larger values', () => {
      const result = getPi(200);
      expect(result.length).toBe(201); // 200 digits + "3."
    });
  });

  describe('verifyPi', () => {
    it('should verify correct PI calculation', () => {
      const calculated = '3.1415926535';
      const expected = '3.1415926535';
      const result = verifyPi(calculated, expected);
      expect(result.isCorrect).toBe(true);
      expect(result.matchingDigits).toBe(11);
    });

    it('should detect incorrect PI calculation', () => {
      const calculated = '3.1415926536';
      const expected = '3.1415926535';
      const result = verifyPi(calculated, expected);
      expect(result.isCorrect).toBe(false);
      expect(result.matchingDigits).toBe(10);
    });

    it('should handle different lengths', () => {
      const calculated = '3.1415926535';
      const expected = '3.14159265358979323846';
      const result = verifyPi(calculated, expected);
      expect(result.isCorrect).toBe(false);
      expect(result.matchingDigits).toBe(11);
    });
  });
});
