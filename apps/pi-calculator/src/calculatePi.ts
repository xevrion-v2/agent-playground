/**
 * Estimate PI using the Monte Carlo method.
 * 
 * Approach:
 * - Generate random points within a 2x2 square centered at origin.
 * - Count how many fall inside the unit circle (x² + y² ≤ 1).
 * - The ratio of inside points to total points approximates π/4.
 * - Multiply by 4 to get the estimate of PI.
 * 
 * Usage:
 *   npx tsx src/calculatePi.ts [numberOfPoints]
 *   Default: 1,000,000 points
 */

function calculatePi(numPoints: number): number {
  let inside = 0;
  for (let i = 0; i < numPoints; i++) {
    const x = Math.random() * 2 - 1;
    const y = Math.random() * 2 - 1;
    if (x * x + y * y <= 1) {
      inside++;
    }
  }
  return (inside / numPoints) * 4;
}

// Read number of points from command line argument, default to 1,000,000
const points = process.argv[2] ? parseInt(process.argv[2], 10) : 1000000;
const pi = calculatePi(points);

console.log(`Estimated PI (${points.toLocaleString()} points): ${pi}`);
console.log(`Difference from Math.PI: ${Math.abs(pi - Math.PI)}`);
