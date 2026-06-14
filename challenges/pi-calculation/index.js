/**
 * PI Calculation Challenge
 * 
 * Uses the Leibniz formula (Madhava-Leibniz series) to calculate PI.
 * Formula: π/4 = Σ ((-1)^n) / (2n + 1) for n = 0 to ∞
 * 
 * This is a lightweight, dependency-free implementation.
 */

function calculatePI(iterations = 10000000) {
  let sum = 0;
  
  for (let n = 0; n < iterations; n++) {
    const term = Math.pow(-1, n) / (2 * n + 1);
    sum += term;
  }
  
  const pi = 4 * sum;
  return pi;
}

function main() {
  const iterations = parseInt(process.argv[2], 10) || 10000000;
  
  console.log(`Calculating PI using Leibniz formula with ${iterations.toLocaleString()} iterations...\n`);
  
  const pi = calculatePI(iterations);
  
  console.log(`Calculated PI:  ${pi}`);
  console.log(`Math.PI:        ${Math.PI}`);
  console.log(`Difference:     ${Math.abs(Math.PI - pi)}`);
}

main();