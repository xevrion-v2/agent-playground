/**
 * PI Calculator — Chudnovsky Algorithm with BigInt
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

export function computePi(digits = 100) {
  if (!Number.isInteger(digits) || digits < 1) {
    throw new Error("digits must be a positive integer");
  }
  const guard = 20;
  const precision = digits + guard;
  const one = 10n ** BigInt(precision);

  const C = 640320n;
  const C3_OVER_24 = C * C * C / 24n;
  const K_CONSTANT = 13591409n;
  const K_MULTIPLIER = 545140134n;

  let sum = K_CONSTANT * one;
  let ak = one;
  const terms = Math.ceil(precision / 14) + 2;

  for (let k = 1; k <= terms; k++) {
    const kb = BigInt(k);
    ak = ak * -(6n * kb - 5n) * (2n * kb - 1n) * (6n * kb - 1n);
    ak = ak / (kb * kb * kb * C3_OVER_24);
    sum += ak * (K_CONSTANT + K_MULTIPLIER * kb);
  }

  const sqrtArg = 10005n * one * one;
  const sqrtVal = isqrt(sqrtArg);
  const pi = (426880n * sqrtVal * one) / sum;

  const piStr = pi.toString();
  const absStr = piStr.startsWith("-") ? piStr.slice(1) : piStr;
  return absStr[0] + "." + absStr.slice(1, digits + 1);
}

export function getCertificate(digits = 100) {
  const pi = computePi(digits);
  return {
    digits,
    value: pi,
    algorithm: "Chudnovsky",
    firstDigits: pi.slice(0, 12),
    timestamp: new Date().toISOString()
  };
}
