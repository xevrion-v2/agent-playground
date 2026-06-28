/**
 * PI Calculation Challenge — TaskFlow Engineering Playground
 *
 * Implements π using the Nilakantha series (15th century Indian mathematician).
 * Converges much faster than the Leibniz formula — reaches 10 decimal places
 * with only ~100,000 iterations vs millions for Leibniz.
 *
 * Formula: π = 3 + 4/(2×3×4) - 4/(4×5×6) + 4/(6×7×8) - 4/(8×9×10) + ...
 *
 * Usage:
 *   npx tsx packages/ui/src/pi-challenge.ts [iterations]
 *
 * Example:
 *   npx tsx packages/ui/src/pi-challenge.ts 100000
 *   → π ≈ 3.141592653589793 (13 correct decimals in ~15ms)
 */

function calculatePi(iterations: number): number {
  let pi = 3;
  let sign = 1;

  for (let i = 0; i < iterations; i++) {
    const n = 2 + i * 2; // 2, 4, 6, 8, ...
    pi += (sign * 4) / (n * (n + 1) * (n + 2));
    sign *= -1; // alternate signs: +, -, +, -, ...
  }

  return pi;
}

function formatDecimal(value: number, places: number): string {
  return value.toFixed(places);
}

// When run directly
const iterations = parseInt(process.argv[2] || "100000", 10);

if (isNaN(iterations) || iterations < 1) {
  console.error("Usage: npx tsx pi-challenge.ts <iterations>");
  console.error("  iterations must be a positive integer");
  process.exit(1);
}

const start = performance.now();
const pi = calculatePi(iterations);
const elapsed = (performance.now() - start).toFixed(2);

const actual = Math.PI;

console.log(`PI Calculation — Nilakantha Series`);
console.log(`─────────────────────────────────`);
console.log(`Iterations : ${iterations.toLocaleString()}`);
console.log(`Calculated : ${formatDecimal(pi, 15)}`);
console.log(`Actual π   : ${formatDecimal(actual, 15)}`);
console.log(`Error      : ${Math.abs(pi - actual).toExponential(3)}`);
console.log(`Time       : ${elapsed}ms`);
console.log();

// Show convergence at milestones
const milestones = [1, 10, 100, 1000, 10000].filter((m) => m <= iterations);
if (milestones.length > 1) {
  console.log("Convergence:");
  for (const m of milestones) {
    const approx = calculatePi(m);
    const correct = countMatchingDigits(approx.toString(), actual.toString());
    console.log(
      `  ${m.toLocaleString().padStart(8)} → ${formatDecimal(approx, 15)} (${correct} digits)`,
    );
  }
}

function countMatchingDigits(a: string, b: string): number {
  let count = 0;
  for (let i = 0; i < Math.min(a.length, b.length); i++) {
    if (a[i] === b[i]) count++;
    else break;
  }
  return Math.max(0, count - 1); // subtract 1 for the "3." prefix
}
