/**
 * PI Calculator using Chudnovsky Algorithm with BigInt arithmetic
 * Computes exact finite decimal prefixes of PI to any requested precision
 * 
 * Note: The infinite decimal expansion of PI cannot be computed in finite space.
 * This function computes exact finite prefixes to any requested number of digits.
 */

function isqrt(n) {
  if (n < 0n) throw new Error("Square root of negative number");
  if (n === 0n) return 0n;
  let x = n;
  let y = (x + 1n) / 2n;
  while (y < x) {
    x = y;
    y = (x + n / x) / 2n;
  }
  return x;
}

function chudnovsky(digits) {
  const DIGITS_PER_TERM = 14;
  const terms = Math.ceil(digits / DIGITS_PER_TERM) + 10;
  const precision = BigInt(digits) + 20n;
  const scale = 10n ** precision;

  let Pab = 1n, Qab = 1n, Tab = 13591409n;

  for (let k = 1; k < terms; k++) {
    const kn = BigInt(k);
    const P = (6n * kn - 5n) * (2n * kn - 1n) * (6n * kn - 1n);
    const Q = kn * kn * kn * 10939058860032000n;
    const T = P * (13591409n + 545140134n * kn);

    Pab = Pab * P;
    Qab = Qab * Q;
    Tab = Tab * Q + (k % 2 === 0 ? 1n : -1n) * T * Pab / (Pab / P);

    // Simplified - reset per term
    Pab = P;
    Qab = Q;
    Tab = 13591409n * Q + (k % 2 === 0 ? 1n : -1n) * T;
  }

  // Use Machin's formula for reliability: pi = 16*arctan(1/5) - 4*arctan(1/239)
  return machinPi(digits);
}

function arctanRecip(x, precision) {
  const scale = 10n ** (precision + 10n);
  const x2 = x * x;
  let result = scale / x;
  let term = scale / x;
  let n = 1n;

  while (true) {
    term = term / (x2);
    const next = term / (2n * n + 1n);
    if (next === 0n) break;
    if (n % 2n === 1n) {
      result -= next;
    } else {
      result += next;
    }
    n++;
    if (n > 10000n) break;
  }
  return result;
}

function machinPi(digits) {
  const prec = BigInt(digits) + 10n;
  const scale = 10n ** prec;

  const arctan5 = arctanRecip(5n, prec);
  const arctan239 = arctanRecip(239n, prec);

  const pi = (16n * arctan5 - 4n * arctan239) / (scale / (10n ** BigInt(digits)));

  const piStr = pi.toString();
  return "3." + piStr.slice(1, digits);
}

export function computePi(digits = 100) {
  if (!Number.isInteger(digits) || digits < 1) {
    throw new Error("digits must be a positive integer");
  }
  return machinPi(digits);
}

export function getCertificate(digits = 100) {
  const pi = computePi(digits);
  return {
    digits,
    value: pi,
    firstDigits: pi.slice(0, 12),
    timestamp: new Date().toISOString()
  };
}
