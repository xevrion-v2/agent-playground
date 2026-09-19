/**
 * Math utility functions for API calculations and data processing.
 * Provides common math helpers beyond the built-in Math object.
 */

/**
 * Clamps a number between a minimum and maximum value.
 *
 * @param value - The value to clamp
 * @param min - The minimum value
 * @param max - The maximum value
 * @returns The clamped value
 *
 * @example
 * ```ts
 * clamp(15, 0, 10) // 10
 * clamp(-5, 0, 10) // 0
 * clamp(5, 0, 10) // 5
 * ```
 */
export function clamp(value: number, min: number, max: number): number {
  if (typeof value !== "number" || isNaN(value)) return min;
  return Math.min(Math.max(value, min), max);
}

/**
 * Linearly interpolates between two values.
 *
 * @param start - The start value
 * @param end - The end value
 * @param t - The interpolation factor (0-1)
 * @returns The interpolated value
 *
 * @example
 * ```ts
 * lerp(0, 10, 0.5) // 5
 * lerp(0, 10, 0) // 0
 * lerp(0, 10, 1) // 10
 * ```
 */
export function lerp(start: number, end: number, t: number): number {
  if (typeof start !== "number" || typeof end !== "number" || typeof t !== "number") return start;
  return start + (end - start) * t;
}

/**
 * Maps a value from one range to another.
 *
 * @param value - The value to map
 * @param inMin - The input range minimum
 * @param inMax - The input range maximum
 * @param outMin - The output range minimum
 * @param outMax - The output range maximum
 * @returns The mapped value
 *
 * @example
 * ```ts
 * mapRange(5, 0, 10, 0, 100) // 50
 * mapRange(0, 0, 10, 50, 100) // 50
 * mapRange(10, 0, 10, 50, 100) // 100
 * ```
 */
export function mapRange(
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number,
): number {
  if (typeof value !== "number" || isNaN(value)) return outMin;
  if (inMax === inMin) return outMin;
  return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
}

/**
 * Rounds a number to a specified number of decimal places.
 *
 * @param value - The value to round
 * @param decimals - The number of decimal places (default: 0)
 * @returns The rounded number
 *
 * @example
 * ```ts
 * round(3.14159, 2) // 3.14
 * round(3.14159, 0) // 3
 * round(3.5, 0) // 4
 * ```
 */
export function round(value: number, decimals = 0): number {
  if (typeof value !== "number" || isNaN(value)) return 0;
  const factor = Math.pow(10, decimals);
  return Math.round(value * factor) / factor;
}

/**
 * Calculates the sum of an array of numbers.
 *
 * @param arr - The array of numbers
 * @returns The sum
 *
 * @example
 * ```ts
 * sum([1, 2, 3, 4, 5]) // 15
 * sum([]) // 0
 * ```
 */
export function sum(arr: number[]): number {
  if (!Array.isArray(arr)) return 0;
  return arr.reduce((acc, val) => acc + (typeof val === "number" ? val : 0), 0);
}

/**
 * Calculates the average (mean) of an array of numbers.
 *
 * @param arr - The array of numbers
 * @returns The average
 *
 * @example
 * ```ts
 * average([1, 2, 3, 4, 5]) // 3
 * average([]) // 0
 * ```
 */
export function average(arr: number[]): number {
  if (!Array.isArray(arr) || arr.length === 0) return 0;
  return sum(arr) / arr.length;
}

/**
 * Calculates the median of an array of numbers.
 *
 * @param arr - The array of numbers
 * @returns The median
 *
 * @example
 * ```ts
 * median([1, 2, 3, 4, 5]) // 3
 * median([1, 2, 3, 4]) // 2.5
 * median([]) // 0
 * ```
 */
export function median(arr: number[]): number {
  if (!Array.isArray(arr) || arr.length === 0) return 0;
  const sorted = [...arr].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  if (sorted.length % 2 === 0) {
    return (sorted[mid - 1] + sorted[mid]) / 2;
  }
  return sorted[mid];
}

/**
 * Finds the mode (most frequent value) of an array of numbers.
 *
 * @param arr - The array of numbers
 * @returns The mode, or undefined if there's no unique mode
 *
 * @example
 * ```ts
 * mode([1, 2, 2, 3, 3, 3]) // 3
 * mode([1, 2, 3]) // undefined (no unique mode)
 * ```
 */
export function mode(arr: number[]): number | undefined {
  if (!Array.isArray(arr) || arr.length === 0) return undefined;
  const counts: Record<number, number> = {};
  let maxCount = 0;
  let modeValue: number | undefined;

  for (const num of arr) {
    counts[num] = (counts[num] || 0) + 1;
    if (counts[num] > maxCount) {
      maxCount = counts[num];
      modeValue = num;
    }
  }

  // Check if there's a unique mode
  const modes = Object.entries(counts).filter(([, count]) => count === maxCount);
  if (modes.length > 1) return undefined;

  return modeValue;
}

/**
 * Calculates the standard deviation of an array of numbers.
 *
 * @param arr - The array of numbers
 * @param sample - Whether to calculate sample standard deviation (default: false)
 * @returns The standard deviation
 *
 * @example
 * ```ts
 * standardDeviation([1, 2, 3, 4, 5]) // ~1.414
 * standardDeviation([1, 2, 3, 4, 5], true) // ~1.581
 * ```
 */
export function standardDeviation(arr: number[], sample = false): number {
  if (!Array.isArray(arr) || arr.length < 2) return 0;
  const avg = average(arr);
  const squaredDiffs = arr.map((val) => Math.pow(val - avg, 2));
  const variance = sum(squaredDiffs) / (sample ? arr.length - 1 : arr.length);
  return Math.sqrt(variance);
}

/**
 * Calculates the variance of an array of numbers.
 *
 * @param arr - The array of numbers
 * @param sample - Whether to calculate sample variance (default: false)
 * @returns The variance
 *
 * @example
 * ```ts
 * variance([1, 2, 3, 4, 5]) // 2
 * variance([1, 2, 3, 4, 5], true) // 2.5
 * ```
 */
export function variance(arr: number[], sample = false): number {
  if (!Array.isArray(arr) || arr.length < 2) return 0;
  const avg = average(arr);
  const squaredDiffs = arr.map((val) => Math.pow(val - avg, 2));
  return sum(squaredDiffs) / (sample ? arr.length - 1 : arr.length);
}

/**
 * Finds the minimum value in an array of numbers.
 *
 * @param arr - The array of numbers
 * @returns The minimum value, or undefined if the array is empty
 *
 * @example
 * ```ts
 * min([3, 1, 4, 1, 5]) // 1
 * min([]) // undefined
 * ```
 */
export function min(arr: number[]): number | undefined {
  if (!Array.isArray(arr) || arr.length === 0) return undefined;
  return Math.min(...arr.filter((v) => typeof v === "number"));
}

/**
 * Finds the maximum value in an array of numbers.
 *
 * @param arr - The array of numbers
 * @returns The maximum value, or undefined if the array is empty
 *
 * @example
 * ```ts
 * max([3, 1, 4, 1, 5]) // 5
 * max([]) // undefined
 * ```
 */
export function max(arr: number[]): number | undefined {
  if (!Array.isArray(arr) || arr.length === 0) return undefined;
  return Math.max(...arr.filter((v) => typeof v === "number"));
}

/**
 * Calculates the range (max - min) of an array of numbers.
 *
 * @param arr - The array of numbers
 * @returns The range, or 0 if the array has fewer than 2 elements
 *
 * @example
 * ```ts
 * range([1, 2, 3, 4, 5]) // 4
 * range([5]) // 0
 * ```
 */
export function range(arr: number[]): number {
  if (!Array.isArray(arr) || arr.length < 2) return 0;
  const minVal = min(arr);
  const maxVal = max(arr);
  if (minVal === undefined || maxVal === undefined) return 0;
  return maxVal - minVal;
}

/**
 * Checks if a number is even.
 *
 * @param n - The number to check
 * @returns True if the number is even, false otherwise
 *
 * @example
 * ```ts
 * isEven(4) // true
 * isEven(3) // false
 * ```
 */
export function isEven(n: number): boolean {
  if (typeof n !== "number" || isNaN(n)) return false;
  return n % 2 === 0;
}

/**
 * Checks if a number is odd.
 *
 * @param n - The number to check
 * @returns True if the number is odd, false otherwise
 *
 * @example
 * ```ts
 * isOdd(3) // true
 * isOdd(4) // false
 * ```
 */
export function isOdd(n: number): boolean {
  if (typeof n !== "number" || isNaN(n)) return false;
  return n % 2 !== 0;
}

/**
 * Checks if a number is prime.
 *
 * @param n - The number to check
 * @returns True if the number is prime, false otherwise
 *
 * @example
 * ```ts
 * isPrime(7) // true
 * isPrime(4) // false
 * isPrime(1) // false
 * ```
 */
export function isPrime(n: number): boolean {
  if (typeof n !== "number" || isNaN(n) || n < 2 || !Number.isInteger(n)) return false;
  if (n === 2) return true;
  if (n % 2 === 0) return false;
  for (let i = 3; i <= Math.sqrt(n); i += 2) {
    if (n % i === 0) return false;
  }
  return true;
}

/**
 * Calculates the factorial of a number.
 *
 * @param n - The number (must be a non-negative integer)
 * @returns The factorial, or 0 if the input is invalid
 *
 * @example
 * ```ts
 * factorial(5) // 120
 * factorial(0) // 1
 * factorial(1) // 1
 * ```
 */
export function factorial(n: number): number {
  if (typeof n !== "number" || isNaN(n) || n < 0 || !Number.isInteger(n)) return 0;
  if (n === 0 || n === 1) return 1;
  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  return result;
}

/**
 * Calculates the greatest common divisor (GCD) of two numbers.
 *
 * @param a - The first number
 * @param b - The second number
 * @returns The GCD
 *
 * @example
 * ```ts
 * gcd(12, 18) // 6
 * gcd(5, 7) // 1
 * ```
 */
export function gcd(a: number, b: number): number {
  if (typeof a !== "number" || typeof b !== "number" || isNaN(a) || isNaN(b)) return 0;
  a = Math.abs(a);
  b = Math.abs(b);
  while (b !== 0) {
    const temp = b;
    b = a % b;
    a = temp;
  }
  return a;
}

/**
 * Calculates the least common multiple (LCM) of two numbers.
 *
 * @param a - The first number
 * @param b - The second number
 * @returns The LCM
 *
 * @example
 * ```ts
 * lcm(4, 6) // 12
 * lcm(5, 7) // 35
 * ```
 */
export function lcm(a: number, b: number): number {
  if (typeof a !== "number" || typeof b !== "number" || isNaN(a) || isNaN(b)) return 0;
  if (a === 0 || b === 0) return 0;
  return Math.abs(a * b) / gcd(a, b);
}

/**
 * Converts degrees to radians.
 *
 * @param degrees - The angle in degrees
 * @returns The angle in radians
 *
 * @example
 * ```ts
 * degreesToRadians(180) // Math.PI
 * degreesToRadians(90) // Math.PI / 2
 * ```
 */
export function degreesToRadians(degrees: number): number {
  if (typeof degrees !== "number" || isNaN(degrees)) return 0;
  return degrees * (Math.PI / 180);
}

/**
 * Converts radians to degrees.
 *
 * @param radians - The angle in radians
 * @returns The angle in degrees
 *
 * @example
 * ```ts
 * radiansToDegrees(Math.PI) // 180
 * radiansToDegrees(Math.PI / 2) // 90
 * ```
 */
export function radiansToDegrees(radians: number): number {
  if (typeof radians !== "number" || isNaN(radians)) return 0;
  return radians * (180 / Math.PI);
}

/**
 * Calculates the percentage of a value.
 *
 * @param value - The value
 * @param total - The total
 * @returns The percentage (0-100)
 *
 * @example
 * ```ts
 * percentage(25, 200) // 12.5
 * percentage(50, 100) // 50
 * ```
 */
export function percentage(value: number, total: number): number {
  if (typeof value !== "number" || typeof total !== "number" || isNaN(value) || isNaN(total) || total === 0) return 0;
  return (value / total) * 100;
}

/**
 * Calculates a percentage of a total.
 *
 * @param percent - The percentage (0-100)
 * @param total - The total
 * @returns The calculated value
 *
 * @example
 * ```ts
 * percentOf(25, 200) // 50
 * percentOf(50, 100) // 50
 * ```
 */
export function percentOf(percent: number, total: number): number {
  if (typeof percent !== "number" || typeof total !== "number" || isNaN(percent) || isNaN(total)) return 0;
  return (percent / 100) * total;
}

/**
 * Generates a random integer between min and max (inclusive).
 *
 * @param min - The minimum value
 * @param max - The maximum value
 * @returns A random integer
 *
 * @example
 * ```ts
 * randomInt(1, 10) // 5 (random)
 * randomInt(0, 1) // 0 or 1
 * ```
 */
export function randomInt(min: number, max: number): number {
  if (typeof min !== "number" || typeof max !== "number" || isNaN(min) || isNaN(max)) return 0;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Generates a random float between min and max.
 *
 * @param min - The minimum value
 * @param max - The maximum value
 * @returns A random float
 *
 * @example
 * ```ts
 * randomFloat(0, 1) // 0.5 (random)
 * randomFloat(1, 10) // 5.5 (random)
 * ```
 */
export function randomFloat(min: number, max: number): number {
  if (typeof min !== "number" || typeof max !== "number" || isNaN(min) || isNaN(max)) return 0;
  return Math.random() * (max - min) + min;
}

/**
 * Formats a number with commas as thousand separators.
 *
 * @param n - The number to format
 * @param decimals - The number of decimal places (default: 0)
 * @returns The formatted number string
 *
 * @example
 * ```ts
 * formatNumber(1234567) // "1,234,567"
 * formatNumber(1234.56, 2) // "1,234.56"
 * formatNumber(1000000) // "1,000,000"
 * ```
 */
export function formatNumber(n: number, decimals = 0): string {
  if (typeof n !== "number" || isNaN(n)) return "0";
  return n.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

/**
 * Formats a number as a currency string.
 *
 * @param amount - The amount
 * @param currency - The currency code (default: "USD")
 * @returns The formatted currency string
 *
 * @example
 * ```ts
 * formatCurrency(1234.56) // "$1,234.56"
 * formatCurrency(1000, "EUR") // "€1,000.00"
 * ```
 */
export function formatCurrency(amount: number, currency = "USD"): string {
  if (typeof amount !== "number" || isNaN(amount)) return "$0.00";
  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
    }).format(amount);
  } catch {
    return `$${amount.toFixed(2)}`;
  }
}

export default {
  clamp,
  lerp,
  mapRange,
  round,
  sum,
  average,
  median,
  mode,
  standardDeviation,
  variance,
  min,
  max,
  range,
  isEven,
  isOdd,
  isPrime,
  factorial,
  gcd,
  lcm,
  degreesToRadians,
  radiansToDegrees,
  percentage,
  percentOf,
  randomInt,
  randomFloat,
  formatNumber,
  formatCurrency,
};
