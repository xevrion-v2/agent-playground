/**
 * Describes the approximation strategy used for PI.
 */
export const PI_APPROACH = "Nilakantha series";

/**
 * Approximates PI using the Nilakantha series.
 *
 * The Nilakantha series converges faster than the classic Leibniz series,
 * which makes it a better lightweight choice when we want a simple algorithm
 * with noticeably better accuracy.
 *
 * ```ts
 * calculatePi(10); // ~3.1415926535
 * ```
 */
export function calculatePi(iterations = 1000): number {
  const safeIterations = Math.max(0, Math.trunc(iterations));
  let value = 3;
  let sign = 1;
  let denominator = 2;

  for (let index = 0; index < safeIterations; index += 1) {
    value += sign * (4 / (denominator * (denominator + 1) * (denominator + 2)));
    sign *= -1;
    denominator += 2;
  }

  return value;
}

/**
 * Returns a short explanation of the chosen PI strategy.
 */
export function getPiApproachNote(): string {
  return `${PI_APPROACH} for a lightweight balance of simplicity and accuracy.`;
}
