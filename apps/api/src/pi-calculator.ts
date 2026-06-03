/**
 * High-precision PI calculator using multiple algorithms
 */

// Bailey-Borwein-Plouffe formula
export function calculatePIBPP(precision = 100): string {
  const scale = BigInt(10) ** BigInt(precision + 10);
  let pi = BigInt(0);

  for (let k = 0; k < precision * 2; k++) {
    const k8 = BigInt(8 * k);
    const term1 = (BigInt(4) * scale) / (k8 + BigInt(1));
    const term2 = (BigInt(2) * scale) / (k8 + BigInt(4));
    const term3 = scale / (k8 + BigInt(5));
    const term4 = scale / (k8 + BigInt(6));
    const divisor = BigInt(16) ** BigInt(k);
    const term = (term1 - term2 - term3 - term4) / divisor;
    pi += term;
  }

  const piStr = pi.toString();
  return piStr[0] + '.' + piStr.slice(1, precision + 1);
}

// Chudnovsky algorithm (faster convergence)
export function calculatePIChudnovsky(precision = 100): string {
  const C = 426880 * Math.sqrt(10005);
  const scale = BigInt(10) ** BigInt(precision + 10);
  let sum = BigInt(0);
  let factorial = BigInt(1);
  let power = BigInt(1);

  for (let k = 0; k < precision / 14 + 1; k++) {
    const k6 = 6 * k;
    const num = factorial * BigInt(13591409 + 545140134 * k);
    const den = power * factorial;
    sum += (k % 2 === 0 ? BigInt(1) : BigInt(-1)) * num / den;
    factorial *= BigInt(k6 + 1) * BigInt(k6 + 2) * BigInt(k6 + 3) * BigInt(k6 + 4) * BigInt(k6 + 5) * BigInt(k6 + 6);
    power *= BigInt(640320) ** BigInt(3);
  }

  const pi = (C * scale) / sum;
  const piStr = pi.toString();
  return piStr[0] + '.' + piStr.slice(1, precision + 1);
}

// Verify PI accuracy
export function verifyPI(calculatedPI: string): { matchingDigits: number; accuracy: string } {
  const knownPI = "3.1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679";
  const minLength = Math.min(calculatedPI.length, knownPI.length);
  let matchingDigits = 0;

  for (let i = 0; i < minLength; i++) {
    if (calculatedPI[i] === knownPI[i]) {
      matchingDigits++;
    } else {
      break;
    }
  }

  return {
    matchingDigits,
    accuracy: (matchingDigits / calculatedPI.length * 100).toFixed(2)
  };
}
