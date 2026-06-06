/**
 * Calculates the value of PI using the Leibniz formula
 * @returns {number} The calculated value of PI
 */
export function calculatePI(): number {
  let pi = 0;
  const iterations = 1000000;
  for (let i = 0; i < iterations; i++) {
    pi += Math.pow(-1, i) / (2 * i + 1);
  }
  return pi * 4;
}

/**
 * Alternative PI calculation using Monte Carlo method
 * @returns {number} The calculated value of PI
 */
export function calculatePIMonteCarlo(): number {
  const iterations = 1000000;
  let insideCircle = 0;
  for (let i = 0; i < iterations; i++) {
    const x = Math.random();