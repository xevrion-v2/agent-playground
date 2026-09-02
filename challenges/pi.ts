/**
 * Lightweight PI estimation challenge.
 *
 * Approach: Monte Carlo integration.
 * We sample N random points in the unit square [0,1]x[0,1] and count how many
 * fall inside the quarter circle x^2 + y^2 <= 1. The ratio approximates π/4,
 * so π ≈ 4 * (points_inside / N).
 *
 * This is simple, deterministic given a seed-like counter, and easy to verify.
 */

export function estimatePi(samples: number): number {
  if (samples <= 0) return 0;
  let inside = 0;
  for (let i = 0; i < samples; i++) {
    const x = Math.random();
    const y = Math.random();
    if (x * x + y * y <= 1) inside++;
  }
  return (4 * inside) / samples;
}

// Documented deterministic variant using a simple LCG so results are reproducible.
export function estimatePiDeterministic(samples: number, seed = 12345): number {
  if (samples <= 0) return 0;
  let state = seed >>> 0;
  const rand = () => {
    // Numerical Recipes LCG
    state = (1664525 * state + 1013904223) >>> 0;
    return state / 0xffffffff;
  };
  let inside = 0;
  for (let i = 0; i < samples; i++) {
    const x = rand();
    const y = rand();
    if (x * x + y * y <= 1) inside++;
  }
  return (4 * inside) / samples;
}
