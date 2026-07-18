
import { Decimal } from 'decimal.js';

export const calculatePi = (iterations: number): Decimal => {
  let pi = new Decimal(0);
  for (let i = 0; i < iterations; i++) {
    const k = 4 * i + 1;
    const sign = i % 2 === 0 ? 1 : -1;
    pi = pi.add(new Decimal(sign).mul(new Decimal(1).div(k * k)));
  }
  return pi.sqrt().mul(6);
};