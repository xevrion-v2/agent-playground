
export function calculatePI(iterations = 1000000) {
  let sum = 0;
  for (let i = 0; i < iterations; i++) {
    sum += (i % 2 === 0 ? 1 : -1) / (2 * i + 1);
  }
  return sum * 4;
}

export function calculatePIBBP(digits = 10) {
  let pi = 0n;
  const ONE = 10n ** BigInt(digits + 10);
  for (let k = 0; k < digits + 5; k++) {
    const term = (4n * ONE) / BigInt(8 * k + 1) - (2n * ONE) / BigInt(8 * k + 4) - ONE / BigInt(8 * k + 5) - ONE / BigInt(8 * k + 6);
    pi += term / (1n << BigInt(4 * k));
  }
  const s = pi.toString();
  const p = s.length - digits - 10;
  return s.substring(0, p) + "." + s.substring(p, p + digits);
}
