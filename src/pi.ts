/**
 * PI Calculation using the Chudnovsky algorithm.
 *
 * The Chudnovsky algorithm is one of the fastest known methods for
 * computing digits of PI, converging roughly 14 digits per iteration.
 *
 * This implementation uses BigInt-based arithmetic for arbitrary precision
 * and demonstrates calculating PI to 1000 decimal places.
 */

function factorial(n: number): bigint {
  let result = 1n;
  for (let i = 2n; i <= BigInt(n); i++) {
    result *= i;
  }
  return result;
}

/**
 * Computes PI to the requested number of decimal places using the
 * Chudnovsky series with BigInt arithmetic.
 */
function computePi(numDecimals: number): string {
  const precision = BigInt(10) ** BigInt(numDecimals + 10);
  const C = 426880n * sqrtBigInt(10005n, precision);
  let S = 0n;
  const iterations = Math.ceil(numDecimals / 14) + 1;

  for (let k = 0; k < iterations; k++) {
    const kBig = BigInt(k);
    const numerator = factorial(6 * k) * (13591409n + 545140134n * kBig);
    const denominator = factorial(3 * k) * factorial(k) ** 3n * (-262537412640768000n) ** kBig;
    S += (numerator * precision) / denominator;
  }

  const piBig = (C * precision) / S;
  const piStr = piBig.toString();
  return piStr[0] + "." + piStr.slice(1, numDecimals + 1);
}

/**
 * Integer square root using Newton's method with arbitrary precision.
 */
function sqrtBigInt(n: bigint, precision: bigint): bigint {
  if (n === 0n) return 0n;
  let x = n * precision;
  let guess = x / 2n;
  if (guess === 0n) guess = 1n;

  for (let i = 0; i < 200; i++) {
    guess = (guess + (x * precision) / guess) / 2n;
  }
  return guess;
}

// Calculate and display PI
const digits = 1000;
const pi = computePi(digits);
console.log(`PI to ${digits} decimal places:`);
console.log(pi);

// Verify known prefix
const knownPrefix = "3.14159265358979323846264338327950288419716939937510";
console.log(`\nPrefix matches known value: ${pi.startsWith(knownPrefix)}`);
