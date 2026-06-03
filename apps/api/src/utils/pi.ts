// PI Calculation Algorithms
// This module implements multiple algorithms for calculating PI with varying
// levels of accuracy and performance characteristics.

/**
 * Calculate PI using the Leibniz formula (Gregory-Leibniz series)
 * PI/4 = 1 - 1/3 + 1/5 - 1/7 + 1/9 - ...
 * 
 * Pros: Simple to understand and implement
 * Cons: Very slow convergence (~300 terms for 2 decimal places)
 * 
 * @param terms Number of series terms to compute (higher = more accurate)
 * @returns Approximation of PI
 */
export function piLeibniz(terms: number = 1000000): number {
  let sum = 0;
  for (let i = 0; i < terms; i++) {
    sum += (i % 2 === 0 ? 1 : -1) / (2 * i + 1);
  }
  return sum * 4;
}

/**
 * Calculate PI using the Nilakantha series
 * PI = 3 + 4/(2*3*4) - 4/(4*5*6) + 4*(6*7*8) - ...
 * 
 * Pros: Faster convergence than Leibniz (~50 terms for 8 decimal places)
 * Cons: Still relatively slow for high precision
 * 
 * @param terms Number of series terms to compute
 * @returns Approximation of PI
 */
export function piNilakantha(terms: number = 1000): number {
  let pi = 3;
  let sign = 1;
  for (let i = 2; i <= terms * 2; i += 2) {
    pi += sign * 4 / (i * (i + 1) * (i + 2));
    sign *= -1;
  }
  return pi;
}

/**
 * Calculate PI using the Machin-like formula (Machin's formula)
 * PI/4 = 4*arctan(1/5) - arctan(1/239)
 * Uses the Taylor series for arctan: arctan(x) = x - x^3/3 + x^5/5 - ...
 * 
 * Pros: Fast convergence, historically used for manual PI calculations
 * Cons: More complex implementation
 * 
 * @param terms Number of arctan series terms
 * @returns Approximation of PI
 */
export function piMachin(terms: number = 50): number {
  // arctan using Taylor series
  const arctan = (x: number, nTerms: number): number => {
    let sum = 0;
    const x2 = x * x;
    let xPow = x;
    for (let i = 0; i < nTerms; i++) {
      sum += (i % 2 === 0 ? 1 : -1) * xPow / (2 * i + 1);
      xPow *= x2;
    }
    return sum;
  };
  
  return 4 * (4 * arctan(1/5, terms) - arctan(1/239, terms));
}

/**
 * Calculate PI using the Chudnovsky algorithm
 * 1/PI = 12 * SUM_k=0^inf (-1)^k * (6k)! * (13591409 + 545140134*k) / ((3k)! * (k!)^3 * 640320^(3k+3/2))
 * 
 * Pros: Extremely fast convergence (~14 digits per term), used in record-breaking calculations
 * Cons: Requires BigInt or arbitrary precision for large factorials
 * 
 * @param terms Number of terms (each term adds ~14 digits of precision)
 * @returns Approximation of PI as a number (limited by JS number precision)
 */
export function piChudnovsky(terms: number = 2): number {
  // For simplicity, we compute using standard JS numbers (limited to ~15 digits)
  // A full implementation would use BigInt or a big number library
  let sum = 0;
  for (let k = 0; k < terms; k++) {
    const sign = k % 2 === 0 ? 1 : -1;
    const numerator = factorial(6 * k) * (13591409 + 545140134 * k);
    const denominator = factorial(3 * k) * Math.pow(factorial(k), 3) * Math.pow(640320, 3 * k + 1.5);
    sum += sign * numerator / denominator;
  }
  return 1 / (12 * sum);
}

function factorial(n: number): number {
  if (n <= 1) return 1;
  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  return result;
}

/**
 * Calculate PI using the Monte Carlo method
 * Generate random points in a unit square and count how many fall inside
 * a quarter circle. Ratio * 4 approximates PI.
 * 
 * Pros: Easy to understand, embarrassingly parallel
 * Cons: Very slow convergence, probabilistic (different results each run)
 * 
 * @param points Number of random points to generate
 * @returns Approximation of PI
 */
export function piMonteCarlo(points: number = 10000000): number {
  let inside = 0;
  for (let i = 0; i < points; i++) {
    const x = Math.random();
    const y = Math.random();
    if (x * x + y * y <= 1) {
      inside++;
    }
  }
  return 4 * inside / points;
}

// Benchmark: compare accuracy of different algorithms
export function benchmarkPI(): void {
  const truePI = Math.PI;
  console.log("True PI:", truePI);
  console.log("");
  
  console.log("Leibniz (1M terms):", piLeibniz(1000000));
  console.log("  Error:", Math.abs(piLeibniz(1000000) - truePI));
  
  console.log("Nilakantha (1000 terms):", piNilakantha(1000));
  console.log("  Error:", Math.abs(piNilakantha(1000) - truePI));
  
  console.log("Machin (50 terms):", piMachin(50));
  console.log("  Error:", Math.abs(piMachin(50) - truePI));
  
  console.log("Chudnovsky (2 terms):", piChudnovsky(2));
  console.log("  Error:", Math.abs(piChudnovsky(2) - truePI));
}
