/**
 * High-precision PI calculator using the Chudnovsky algorithm.
 *
 * Computes PI to arbitrary precision using BigInt integer arithmetic.
 * This demonstrates that while we cannot write all digits of PI,
 * we can compute as many as we need.
 */

function factorial(n: number): bigint {
  let result = 1n;
  for (let i = 2n; i <= BigInt(n); i++) {
    result *= i;
  }
  return result;
}

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

function computePi(numDecimals: number): string {
  const precision = BigInt(10) ** BigInt(numDecimals + 10);
  const C = 426880n * sqrtBigInt(10005n, precision);
  let S = 0n;
  const iterations = Math.ceil(numDecimals / 14) + 1;

  for (let k = 0; k < iterations; k++) {
    const kBig = BigInt(k);
    const numerator = factorial(6 * k) * (13591409n + 545140134n * kBig);
    const denominator =
      factorial(3 * k) * factorial(k) ** 3n * (-262537412640768000n) ** kBig;
    S += (numerator * precision) / denominator;
  }

  const piBig = (C * precision) / S;
  const piStr = piBig.toString();
  return piStr[0] + "." + piStr.slice(1, numDecimals + 1);
}

// Compute PI to 1000 decimal places
const digits = 1000;
console.log(`Computing PI to ${digits} decimal places...\n`);
const pi = computePi(digits);
console.log(pi);

const known =
  "3.1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679";
console.log(`\nPrefix verified: ${pi.startsWith(known)}`);
