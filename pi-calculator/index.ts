/**
 * Calculates PI with specified precision using Machin's formula
 * @param decimalPlaces Number of decimal places to calculate (default: 10)
 * @returns PI value as string (to preserve precision)
 */
export function calculatePI(decimalPlaces: number = 10): string {
  if (decimalPlaces < 0) throw new Error("Decimal places must be non-negative");
  if (decimalPlaces === 0) return "3";

  // Machin's formula: ¦Ð/4 = 4arctan(1/5) - arctan(1/239)
  const arctan1_5 = calculateArctan(1, 5, decimalPlaces + 2);
  const arctan1_239 = calculateArctan(1, 239, decimalPlaces + 2);
  
  const pi = multiplyByInteger(subtract(multiplyByInteger(arctan1_5, 4), arctan1_239), 4);
  
  // Format the result to specified decimal places
  const integerPart = pi[0];
  const decimalPart = pi.slice(1, decimalPlaces + 1).map(d => d.toString().padStart(1, '0')).join('');
  
  return ${integerPart}.;
}

/**
 * Calculates arctan(1/x) using Taylor series with specified precision
 * @param numerator Numerator of the fraction (usually 1)
 * @param denominator Denominator of the fraction (x in 1/x)
 * @param decimalPlaces Required precision in decimal places
 * @returns Arctan value as array of digits (first element is integer part)
 */
function calculateArctan(numerator: number, denominator: number, decimalPlaces: number): number[] {
  const precision = decimalPlaces + 2;
  // Initialize result as array of digits (index 0 is integer part, rest are decimals)
  let result = new Array(precision + 1).fill(0);
  
  // Calculate 1/x
  let term = divide(numerator, denominator, precision);
  addTo(result, term);
  
  let n = 1;
  let sign = -1;
  
  while (true) {
    // term = term * ((n*2 - 1) / (n*2 + 1)) * (1/(denominator^2))
    term = multiplyByInteger(term, n * 2 - 1);
    term = divideByInteger(term, n * 2 + 1);
    term = divideByInteger(term, denominator * denominator);
    
    if (isZero(term)) break;
    
    if (sign > 0) {
      addTo(result, term);
    } else {
      subtractFrom(result, term);
    }
    
    sign = -sign;
    n++;
  }
  
  return result;
}

/**
 * Divides a number (as digit array) by an integer
 * @param digits Digit array representing the number
 * @param divisor Integer divisor
 * @returns Result as digit array
 */
function divideByInteger(digits: number[], divisor: number): number[] {
  const result = [...digits];
  let remainder = 0;
  
  for (let i = 0; i < result.length; i++) {
    const current = remainder * 10 + result[i];
    result[i] = Math.floor(current / divisor);
    remainder = current % divisor;
  }
  
  return result;
}

/**
 * Divides an integer by another integer, returns result as digit array
 * @param numerator Integer numerator
 * @param denominator Integer denominator
 * @param precision Number of decimal places
 * @returns Result as digit array
 */
function divide(numerator: number, denominator: number, precision: number): number[] {
  const result = new Array(precision + 1).fill(0);
  let remainder = numerator;
  
  for (let i = 0; i <= precision; i++) {
    result[i] = Math.floor(remainder / denominator);
    remainder = (remainder % denominator) * 10;
  }
  
  return result;
}

/**
 * Multiplies a digit array by an integer
 * @param digits Digit array representing the number
 * @param multiplier Integer multiplier
 * @returns Result as digit array
 */
function multiplyByInteger(digits: number[], multiplier: number): number[] {
  const result = [...digits];
  let carry = 0;
  
  for (let i = result.length - 1; i >= 0; i--) {
    const product = result[i] * multiplier + carry;
    result[i] = product % 10;
    carry = Math.floor(product / 10);
  }
  
  // Handle remaining carry (should be 0 for our use case)
  if (carry > 0) {
    result.unshift(carry);
  }
  
  return result;
}

/**
 * Subtracts two digit arrays (a - b), assumes a >= b
 * @param a Minuend digit array
 * @param b Subtrahend digit array
 * @returns Result as digit array
 */
function subtract(a: number[], b: number[]): number[] {
  const result = [...a];
  let borrow = 0;
  
  for (let i = result.length - 1; i >= 0; i--) {
    let diff = result[i] - (b[i] || 0) - borrow;
    if (diff < 0) {
      diff += 10;
      borrow = 1;
    } else {
      borrow = 0;
    }
    result[i] = diff;
  }
  
  return result;
}

/**
 * Adds b to a (modifies a in place)
 * @param a Target digit array
 * @param b Digit array to add
 */
function addTo(a: number[], b: number[]): void {
  let carry = 0;
  for (let i = a.length - 1; i >= 0; i--) {
    const sum = a[i] + (b[i] || 0) + carry;
    a[i] = sum % 10;
    carry = Math.floor(sum / 10);
  }
  // Carry beyond integer part is ignored as it's not needed for our calculations
}

/**
 * Subtracts b from a (modifies a in place), assumes a >= b
 * @param a Target digit array
 * @param b Digit array to subtract
 */
function subtractFrom(a: number[], b: number[]): void {
  let borrow = 0;
  for (let i = a.length - 1; i >= 0; i--) {
    let diff = a[i] - (b[i] || 0) - borrow;
    if (diff < 0) {
      diff += 10;
      borrow = 1;
    } else {
      borrow = 0;
    }
    a[i] = diff;
  }
}

/**
 * Checks if a digit array represents zero
 * @param digits Digit array to check
 * @returns True if the number is zero
 */
function isZero(digits: number[]): boolean {
  return digits.every(d => d === 0);
}
