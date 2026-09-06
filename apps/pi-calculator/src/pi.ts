/**
 * Lightweight PI Calculator using Monte Carlo method.
 *
 * Estimates π by randomly sampling points in a unit square and
 * checking how many fall inside the quarter circle.
 *
 * ratio ≈ π/4 → π ≈ 4 * ratio
 */

export function estimatePi(samples: number): number {
  if (samples <= 0) throw new Error("samples must be positive");
  let inside = 0;
  for (let i = 0; i < samples; i++) {
    const x = Math.random();
    const y = Math.random();
    if (x * x + y * y <= 1) inside++;
  }
  return (4 * inside) / samples;
}

// CLI entry-point
const n = parseInt(process.argv[2] || "100000", 10);
const pi = estimatePi(n);
console.log(`Estimated π ≈ ${pi}  (samples: ${n}, error: ${Math.abs(pi - Math.PI).toFixed(6)})`);
