function arctanInverse(inverseX, scale) {
  const x = BigInt(inverseX);
  const xSquared = x * x;
  let term = scale / x;
  let sum = term;
  let denominator = 1n;
  let sign = -1n;

  while (term !== 0n) {
    term /= xSquared;
    denominator += 2n;
    sum += sign * (term / denominator);
    sign *= -1n;
  }

  return sum;
}

export function calculatePiDigits(digits = 100) {
  if (!Number.isInteger(digits) || digits < 1) {
    throw new RangeError("digits must be a positive integer");
  }

  const guardDigits = 10;
  const scale = 10n ** BigInt(digits + guardDigits);
  const pi = 16n * arctanInverse(5, scale) - 4n * arctanInverse(239, scale);
  const rounded = pi / (10n ** BigInt(guardDigits));
  const raw = rounded.toString().padStart(digits + 1, "0");

  return `${raw[0]}.${raw.slice(1)}`;
}

if (import.meta.url === `file://${process.argv[1]?.replace(/\\/g, "/")}`) {
  const digits = process.argv[2] ? Number(process.argv[2]) : 100;
  console.log(calculatePiDigits(digits));
}
