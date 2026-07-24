/**
 * Estimate PI using the Leibniz series.
 * Converges slowly but is deterministic and easy to audit.
 */
export function estimatePi(iterations: number): number {
  if (!Number.isInteger(iterations) || iterations <= 0) {
    throw new Error("iterations must be a positive integer");
  }

  let sum = 0;
  for (let i = 0; i < iterations; i += 1) {
    const term = 1 / (2 * i + 1);
    sum += i % 2 === 0 ? term : -term;
  }
  return sum * 4;
}

/** Default iteration count for a quick local demo. */
export const DEFAULT_PI_ITERATIONS = 10_000;

export function estimatePiDefault(): number {
  return estimatePi(DEFAULT_PI_ITERATIONS);
}
