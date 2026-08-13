/**
 * High-precision PI calculation using the Chudnovsky algorithm.
 *
 * The Chudnovsky algorithm converges at ~14 digits per term, making it
 * one of the fastest converging series for computing PI.
 *
 * Formula:
 *   1/PI = (12 / C^(3/2)) * SUM_k=0_to_inf ((-1)^k * (6k)! * (A + B*k)) / ((3k)! * (k!)^3 * C^k)
 *
 * where:
 *   A = 13591409
 *   B = 545140134
 *   C = 640320
 *
 * Reference: Chudnovsky & Chudnovsky (1988)
 */

function factorial(n: number): bigint {
  let result = 1n;
  for (let i = 2n; i <= BigInt(n); i++) {
    result *= i;
  }
  return result;
}

/**
 * Compute PI to a specified number of decimal places using the Chudnovsky algorithm.
 * @param terms - Number of series terms to compute (more terms = more precision)
 * @returns PI as a string with the requested precision
 */
export function computePi(terms: number = 1): string {
  const A = 13591409n;
  const B = 545140134n;
  const C = 640320n;
  const C3_OVER_24 = (C * C * C) / 24n;

  let sum = 0n;

  for (let k = 0; k < terms; k++) {
    const kBig = BigInt(k);
    const sixKFact = factorial(6 * k);
    const threeKFact = factorial(3 * k);
    const kFactCubed = factorial(k) ** 3n;

    const numerator = sixKFact * (A + B * kBig);
    const denominator = threeKFact * kFactCubed * C ** kBig;

    if (k % 2 === 0) {
      sum += numerator / denominator;
    } else {
      sum -= numerator / denominator;
    }
  }

  // PI = (426880 * sqrt(10005)) / sum
  // Using BigInt integer sqrt for precision
  const sqrtArg = 10005n * 10n ** 40n; // extra precision digits
  const sqrt10005 = bigintSqrt(sqrtArg);
  const pi = (426880n * sqrt10005) / sum;

  const piStr = pi.toString();
  // Insert decimal point after first digit
  return piStr[0] + "." + piStr.slice(1);
}

function bigintSqrt(n: bigint): bigint {
  if (n < 2n) return n;
  let x = n;
  let y = (x + 1n) / 2n;
  while (y < x) {
    x = y;
    y = (x + n / x) / 2n;
  }
  return x;
}

// Reference value of PI for comparison
export const PI_REFERENCE = "3.14159265358979323846264338327950288419716939937510";

// CLI usage
if (require.main === module) {
  const terms = parseInt(process.argv[2] || "1", 10);
  console.log(`Computing PI with ${terms} term(s) of the Chudnovsky algorithm:`);
  console.log(computePi(terms));
  console.log(`Reference: ${PI_REFERENCE}`);
}
