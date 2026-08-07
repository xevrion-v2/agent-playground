/**
 * PI Calculator using the Machin-like formula.
 *
 * Uses:  π/4 = 4·arctan(1/5) − arctan(1/239)
 *
 * This is a classic formula that converges quickly and is easy
 * to implement with BigInt fixed-point arithmetic for arbitrary
 * precision. Each arctan term is computed via its Taylor series:
 *
 *   arctan(1/x) = 1/x − 1/(3x³) + 1/(5x⁵) − 1/(7x⁷) + ...
 */

const MAX_DIGITS = 1000;

/**
 * Compute arctan(1/x) in fixed-point arithmetic.
 * unity is the fixed-point unit (e.g. 10^(digits+10)).
 */
function arccot(x: bigint, unity: bigint): bigint {
  const X = x;
  let sum = 0n;
  let power = unity / X;
  let n = 1n;
  let sign = true;

  while (power !== 0n) {
    sum += (sign ? power : -power) / n;
    power = power / (X * X);
    n += 2n;
    sign = !sign;
  }
  return sum;
}

/**
 * Calculate π to the given number of decimal places.
 *
 * @param digits - Desired decimal places (1–1000, default 100)
 * @returns String representation of π (e.g. "3.14159...")
 */
export function calculatePi(digits: number = 100): string {
  const clamped = Math.min(Math.max(digits, 1), MAX_DIGITS);
  const guard = 10; // extra digits to avoid rounding artifacts
  const unity = 10n ** BigInt(clamped + guard);

  // Machin: π/4 = 4·arctan(1/5) − arctan(1/239)
  const pi = 4n * (4n * arccot(5n, unity) - arccot(239n, unity));

  const raw = pi.toString();
  const intPart = raw[0]; // "3"
  const fracPart = raw.slice(1, clamped + 1).padEnd(clamped, "0");
  return `${intPart}.${fracPart}`;
}

/** Verify result against the known first 50 digits of π */
export function verifyPi(value: string): boolean {
  const known = "3.14159265358979323846264338327950288419716939937510";
  return value.startsWith(known);
}
