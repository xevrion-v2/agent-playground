#!/usr/bin/env node

/**
 * Calculates Pi to a specified number of decimal places using Machin's Formula:
 * Pi/4 = 4 * arctan(1/5) - arctan(1/239)
 * 
 * Taylor series for arctan(x) = x - x^3/3 + x^5/5 - x^7/7 + ...
 */

const [digitsArg] = process.argv.slice(2);
const digits = digitsArg ? parseInt(digitsArg, 10) : 1000;

if (isNaN(digits) || digits <= 0) {
  console.error("Please provide a positive integer for the number of decimal places.");
  process.exit(1);
}

// We calculate with a few extra digits to prevent rounding errors
const extraDigits = 10;
const precision = BigInt(digits + extraDigits);
const one = 10n ** precision;

function arccot(x, unity) {
  const xBig = BigInt(x);
  let term = unity / xBig;
  let sum = term;
  let n = 1n;
  const xStep = xBig * xBig;

  while (term > 0n) {
    term = term / xStep;
    const nextTerm = term / (2n * n + 1n);
    if (nextTerm === 0n) break;
    if (n % 2n === 1n) {
      sum -= nextTerm;
    } else {
      sum += nextTerm;
    }
    n += 1n;
  }
  return sum;
}

function calculatePi(digitsCount) {
  // Machin's Formula: Pi = 4 * (4 * arccot(5) - arccot(239))
  const unity = 10n ** (BigInt(digitsCount) + 10n);
  const term1 = 4n * arccot(5, unity);
  const term2 = arccot(239, unity);
  const pi = 4n * (term1 - term2);
  
  // Divide by 10^10 to get the requested precision
  return pi / (10n ** 10n);
}

const piValue = calculatePi(digits);
const piStr = piValue.toString();

// Format output: 3.14159...
const formattedPi = piStr.slice(0, 1) + "." + piStr.slice(1);
console.log(formattedPi);
