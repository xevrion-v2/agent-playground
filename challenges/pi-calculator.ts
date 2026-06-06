/**
 * PI Calculator — Multiple algorithmic approaches
 *
 * Demonstrates three algorithms for computing PI:
 * 1. Machin's formula (fast convergence, used for world records)
 * 2. Leibniz series (simple but slow convergence — educational)
 * 3. Monte Carlo method (probabilistic, demonstrates randomness)
 *
 * Bounty: agent-playground #14 ($50)
 */

/**
 * Machin's formula: π/4 = 4·arctan(1/5) - arctan(1/239)
 * Uses Taylor series for arctan. Converges quickly (~1.4 decimal digits per term).
 */
export function machinPi(iterations: number = 50): number {
  function arctan(x: number, terms: number): number {
    let sum = 0;
    let power = x;
    for (let n = 0; n < terms; n++) {
      const term = power / (2 * n + 1);
      sum += n % 2 === 0 ? term : -term;
      power *= x * x;
    }
    return sum;
  }

  return 4 * (4 * arctan(1 / 5, iterations) - arctan(1 / 239, iterations));
}

/**
 * Leibniz series: π/4 = 1 - 1/3 + 1/5 - 1/7 + ...
 * Simple but converges extremely slowly (O(1/n)). Included for educational value.
 */
export function leibnizPi(iterations: number = 10000): number {
  let sum = 0;
  for (let n = 0; n < iterations; n++) {
    sum += (n % 2 === 0 ? 1 : -1) / (2 * n + 1);
  }
  return 4 * sum;
}

/**
 * Monte Carlo estimation: random points in a unit square; ratio inside
 * the quarter-circle approximates π/4. Demonstrates probabilistic algorithms.
 */
export function monteCarloPi(samples: number = 100000): number {
  let inside = 0;
  for (let i = 0; i < samples; i++) {
    const x = Math.random();
    const y = Math.random();
    if (x * x + y * y <= 1) inside++;
  }
  return (4 * inside) / samples;
}

/**
 * Calculate PI to a specified number of digits using Machin's formula.
 * Each iteration adds ~1.4 correct decimal digits.
 */
export function calculatePiDigits(digits: number = 15): number {
  const iterations = Math.ceil(digits / 1.4);
  return machinPi(iterations);
}

// If run directly: print PI at various precision levels
if (require.main === module) {
  console.log("=== PI Calculation Demonstrations ===\n");
  console.log(`Math.PI (built-in):        ${Math.PI}`);
  console.log(`Machin (50 iter):          ${machinPi(50)}`);
  console.log(`Leibniz (10000 iter):      ${leibnizPi(10000)}`);
  console.log(`Monte Carlo (100k samples): ${monteCarloPi(100000)}`);
  console.log(`\nError vs Math.PI:`);
  console.log(`  Machin:    ${Math.abs(Math.PI - machinPi(50)).toExponential(2)}`);
  console.log(`  Leibniz:   ${Math.abs(Math.PI - leibnizPi(10000)).toExponential(2)}`);
  console.log(`  MonteCarlo: ${Math.abs(Math.PI - monteCarloPi(100000)).toExponential(2)}`);
}
