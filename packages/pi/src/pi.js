/**
 * Computes Pi using Machin's formula:
 * pi/4 = 4*arctan(1/5) - arctan(1/239)
 * 
 * Using BigInt arithmetic for arbitrary precision.
 */

function arccot(x, unity) {
  let sum = 0n;
  let x_power = unity / x;
  let n = 1n;
  let sign = 1n;
  while (x_power > 0n) {
    const term = x_power / n;
    if (term === 0n) break;
    if (sign === 1n) {
      sum += term;
    } else {
      sum -= term;
    }
    x_power = x_power / (x * x);
    n += 2n;
    sign = -sign;
  }
  return sum;
}

/**
 * Calculates the value of Pi up to the specified number of decimal digits.
 *
 * @param {number} digits The number of decimal digits to compute.
 * @returns {string} Pi as a formatted string (e.g. "3.14159...")
 */
export function calculatePi(digits) {
  if (typeof digits !== "number" || isNaN(digits)) {
    throw new TypeError("Digits must be a number");
  }
  if (digits < 0) {
    throw new RangeError("Number of digits must be non-negative");
  }
  if (digits === 0) {
    return "3";
  }

  // Use extra guard digits to prevent rounding errors at the end
  const guardDigits = 10n;
  const unity = 10n ** (BigInt(digits) + guardDigits);
  const piScaled = 16n * arccot(5n, unity) - 4n * arccot(239n, unity);
  
  // Truncate guard digits
  const pi = piScaled / (10n ** guardDigits);
  const piStr = pi.toString();

  // If piStr is shorter than the requested digits + 1 (the leading 3), pad it.
  // pi starts with 3 (1 digit) followed by fractional digits.
  const expectedLen = digits + 1;
  const padded = piStr.padStart(expectedLen, "0");
  
  return padded.slice(0, 1) + "." + padded.slice(1);
}
