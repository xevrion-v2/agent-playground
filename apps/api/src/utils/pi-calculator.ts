/**
 * PI Calculator using Leibniz formula
 * 
 * This is a lightweight implementation of the Leibniz formula for π:
 * π/4 = 1 - 1/3 + 1/5 - 1/7 + 1/9 - ...
 * 
 * @param iterations Number of iterations to run the calculation
 * @returns Approximation of PI
 */
export const calculatePI = (iterations: number = 1000000): number => {
  let pi = 0;
  for (let i = 0; i < iterations; i++) {
    const denominator = 2 * i + 1;
    const sign = i % 2 === 0 ? 1 : -1;
    pi += sign * (1 / denominator);
  }
  return pi * 4;
};

export const calculatePIWithPrecision = (decimalPlaces: number): number => {
  const targetPrecision = Math.pow(10, -decimalPlaces);
  let pi = 0;
  let difference = 1;
  let iterations = 1000000;
  let previousPi;
  
  // Calculate until the difference is less than the target precision
  do {
    previousPi = pi;
    pi = calculatePI(iterations);
    difference = Math.abs(pi - previousPi);
    iterations *= 2;
  } while (difference > targetPrecision && iterations < 100000000);
  
  return pi;
};