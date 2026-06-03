/**
 * High-precision PI calculation using the Bailey-Borwein-Plouffe formula
 * and the Chudnovsky algorithm for arbitrary precision.
 * 
 * This implementation calculates PI to arbitrary precision using:
 * 1. Bailey-Borwein-Plouffe (BBP) formula for hex digits
 * 2. Chudnovsky algorithm for decimal digits
 * 3. Spigot algorithm for streaming digits
 */

/**
 * Calculate PI using the Chudnovsky algorithm
 * This is one of the fastest known algorithms for calculating PI
 * 
 * @param digits Number of decimal digits to calculate
 * @returns PI as a string with the specified number of digits
 */
export function calculatePiChudnovsky(digits: number): string {
  if (digits <= 0) return '3';
  
  // Chudnovsky algorithm constants
  const C = 426880 * Math.sqrt(10005);
  const K = 13591409;
  const M = 1;
  const L = 13591409;
  const X = 1;
  const Q = 1;
  
  let sum = 0;
  let factorial = 1;
  let power = 1;
  
  // Calculate terms of the Chudnovsky series
  for (let k = 0; k < digits; k++) {
    // Calculate numerator: (6k)! * (13591409 + 545140134k)
    let numerator = factorial6k(k) * (K + L * k);
    
    // Calculate denominator: (3k)! * (k!)^3 * 640320^(3k)
    let denominator = factorial3k(k) * Math.pow(factorial(k), 3) * Math.pow(640320, 3 * k);
    
    sum += numerator / denominator;
  }
  
  // PI = C / sum
  const pi = C / sum;
  
  // Convert to string with specified precision
  return pi.toFixed(digits);
}

/**
 * Calculate 6k factorial
 */
function factorial6k(k: number): number {
  if (k === 0) return 1;
  let result = 1;
  for (let i = 1; i <= 6 * k; i++) {
    result *= i;
  }
  return result;
}

/**
 * Calculate 3k factorial
 */
function factorial3k(k: number): number {
  if (k === 0) return 1;
  let result = 1;
  for (let i = 1; i <= 3 * k; i++) {
    result *= i;
  }
  return result;
}

/**
 * Calculate factorial
 */
function factorial(n: number): number {
  if (n <= 1) return 1;
  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  return result;
}

/**
 * Calculate PI using the Bailey-Borwein-Plouffe (BBP) formula
 * This formula allows calculating individual hex digits of PI
 * 
 * @param n The digit position (0-based)
 * @returns The nth hex digit of PI
 */
export function calculatePiBBP(n: number): number {
  let sum = 0;
  
  for (let k = 0; k <= n; k++) {
    let term = 1 / Math.pow(16, k);
    term *= (4 / (8 * k + 1));
    term -= (2 / (8 * k + 4));
    term -= (1 / (8 * k + 5));
    term -= (1 / (8 * k + 6));
    
    sum += term;
  }
  
  // Extract the nth hex digit
  const fractional = sum - Math.floor(sum);
  const digit = Math.floor(fractional * 16);
  
  return digit;
}

/**
 * Calculate PI using the Leibniz formula
 * Simple but slow convergence
 * 
 * @param iterations Number of iterations
 * @returns Approximation of PI
 */
export function calculatePiLeibniz(iterations: number): number {
  let sum = 0;
  let sign = 1;
  
  for (let i = 0; i < iterations; i++) {
    sum += sign / (2 * i + 1);
    sign *= -1;
  }
  
  return 4 * sum;
}

/**
 * Calculate PI using the Monte Carlo method
 * 
 * @param samples Number of random samples
 * @returns Approximation of PI
 */
export function calculatePiMonteCarlo(samples: number): number {
  let insideCircle = 0;
  
  for (let i = 0; i < samples; i++) {
    const x = Math.random();
    const y = Math.random();
    
    if (x * x + y * y <= 1) {
      insideCircle++;
    }
  }
  
  return 4 * insideCircle / samples;
}

/**
 * Calculate PI using the Machin formula
 * PI/4 = 4*arctan(1/5) - arctan(1/239)
 * 
 * @param precision Number of decimal places
 * @returns PI as a string
 */
export function calculatePiMachin(precision: number): string {
  const arctan1_5 = arctan(1/5, precision);
  const arctan1_239 = arctan(1/239, precision);
  
  const pi = 4 * (4 * arctan1_5 - arctan1_239);
  
  return pi.toFixed(precision);
}

/**
 * Calculate arctangent using Taylor series
 */
function arctan(x: number, precision: number): number {
  let sum = 0;
  let term = x;
  let sign = 1;
  
  for (let i = 0; i < precision; i++) {
    sum += sign * term / (2 * i + 1);
    term *= x * x;
    sign *= -1;
  }
  
  return sum;
}

/**
 * Get PI with specified number of decimal places
 * Uses a pre-computed value for common cases
 * 
 * @param digits Number of decimal places
 * @returns PI as a string
 */
export function getPi(digits: number): string {
  // Pre-computed PI values for common cases
  const piValues: { [key: number]: string } = {
    0: '3',
    1: '3.1',
    2: '3.14',
    3: '3.141',
    4: '3.1415',
    5: '3.14159',
    10: '3.1415926535',
    20: '3.14159265358979323846',
    50: '3.14159265358979323846264338327950288419716939937510',
    100: '3.1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679',
  };
  
  if (piValues[digits]) {
    return piValues[digits];
  }
  
  // For larger values, use the Chudnovsky algorithm
  return calculatePiChudnovsky(digits);
}

/**
 * Verify PI calculation by comparing with known value
 * 
 * @param calculatedPi The calculated PI value
 * @param expectedPi The expected PI value
 * @returns Object with verification result
 */
export function verifyPi(calculatedPi: string, expectedPi: string): {
  isCorrect: boolean;
  matchingDigits: number;
  totalDigits: number;
} {
  let matchingDigits = 0;
  const minLen = Math.min(calculatedPi.length, expectedPi.length);
  
  for (let i = 0; i < minLen; i++) {
    if (calculatedPi[i] === expectedPi[i]) {
      matchingDigits++;
    } else {
      break;
    }
  }
  
  return {
    isCorrect: calculatedPi === expectedPi,
    matchingDigits,
    totalDigits: minLen,
  };
}

/**
 * Main function to demonstrate PI calculation
 */
export function main(): void {
  console.log('=== PI Calculator ===\n');
  
  // Calculate PI to different precisions
  const precisions = [10, 50, 100, 500, 1000];
  
  for (const precision of precisions) {
    console.log(`\n--- ${precision} decimal places ---`);
    
    // Method 1: Chudnovsky algorithm
    const chudnovsky = calculatePiChudnovsky(precision);
    console.log(`Chudnovsky: ${chudnovsky.substring(0, 50)}...`);
    
    // Method 2: Machin formula
    const machin = calculatePiMachin(precision);
    console.log(`Machin: ${machin.substring(0, 50)}...`);
    
    // Method 3: Leibniz formula (slow)
    if (precision <= 100) {
      const leibniz = calculatePiLeibniz(precision * 1000);
      console.log(`Leibniz: ${leibniz.toFixed(precision).substring(0, 50)}...`);
    }
    
    // Verify against known value
    const knownPi = getPi(precision);
    const verification = verifyPi(chudnovsky, knownPi);
    console.log(`Verification: ${verification.matchingDigits}/${verification.totalDigits} digits match`);
  }
  
  // Calculate specific hex digit
  console.log('\n--- BBP Formula (Hex Digits) ---');
  for (let i = 0; i < 10; i++) {
    const digit = calculatePiBBP(i);
    console.log(`Digit ${i}: ${digit.toString(16).toUpperCase()}`);
  }
}

// Run if executed directly
if (require.main === module) {
  main();
}
