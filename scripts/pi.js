#!/usr/bin/env node

function arctanInverse(q, scale) {
  const qBig = BigInt(q);
  const q2 = qBig * qBig;
  let term = scale / qBig;
  let sum = term;
  let denominator = 3n;
  let sign = -1n;

  while (term !== 0n) {
    term = term / q2;
    if (term === 0n) break;
    const addend = term / denominator;
    if (addend === 0n) break;
    sum += sign * addend;
    sign *= -1n;
    denominator += 2n;
  }

  return sum;
}

function piDigits(digits) {
  if (!Number.isInteger(digits) || digits < 0) {
    throw new Error('digits must be a non-negative integer');
  }

  const guardDigits = 10;
  const scale = 10n ** BigInt(digits + guardDigits);
  const piScaled = 16n * arctanInverse(5, scale) - 4n * arctanInverse(239, scale);
  const truncated = piScaled / 10n ** BigInt(guardDigits);

  if (digits === 0) return truncated.toString();

  const raw = truncated.toString().padStart(digits + 1, '0');
  return `${raw.slice(0, -digits)}.${raw.slice(-digits)}`;
}

if (require.main === module) {
  const digits = Number.parseInt(process.argv[2] || '100', 10);
  console.log(piDigits(digits));
}

module.exports = { piDigits };
