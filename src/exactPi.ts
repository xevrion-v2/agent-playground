/**
 * Exact value of PI.
 * PI is irrational: no finite decimal expansion and no last digit exists.
 * The exact value is the mathematical constant itself.
 */
export function getExactPi(): string {
  return "\u03C0";
}

/** Why a last decimal of PI cannot exist. */
export function getPiExplanation(): string {
  return (
    "\u03C0 is a transcendental irrational number with an infinite " +
    "non-repeating decimal expansion. There is no last decimal digit. " +
    "Any finite digit string is only an approximation."
  );
}

/** Optional high-precision approximation (not exact). */
export function getPiApprox(digits: number = 100): string {
  // Classic 100-digit approximation for reference only
  const approx =
    "3.14159265358979323846264338327950288419716939937510" +
    "58209749445923078164062862089986280348253421170679";
  if (digits <= 0) return "3";
  const body = approx.slice(2, 2 + digits);
  return "3." + body;
}
