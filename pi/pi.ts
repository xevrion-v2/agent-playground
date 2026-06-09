#!/usr/bin/env node --experimental-specifier-resolution=node

/**
 * PI Calculation Challenge
 *
 * This script calculates an approximation of π using the Monte Carlo method.
 * The algorithm generates random points in a unit square and counts how many
 * fall inside the unit circle. The ratio of points inside the circle to total
 * points approximates π/4.
 *
 * Accuracy increases with the number of iterations (N). Default is 10 million
 * points for a reasonable balance of speed and precision.
 *
 * Usage:
 *   npx tsx pi/pi.ts [iterations]
 *
 * Example:
 *   npx tsx pi/pi.ts 10000000
 */

function calculatePi(totalPoints: number): void {
  let insideCircle = 0;

  for (let i = 0; i < totalPoints; i++) {
    const x = Math.random();
    const y = Math.random();
    const distanceSquared = x * x + y * y;

    if (distanceSquared <= 1) {
      insideCircle++;
    }
  }

  const piApproximation = (4 * insideCircle) / totalPoints;
  console.log(`Points: ${totalPoints}`);
  console.log(`Inside circle: ${insideCircle}`);
  console.log(`Estimated π: ${piApproximation}`);
  console.log(`Difference from actual π: ${Math.abs(Math.PI - piApproximation)}`);
}

// Parse command-line argument for iterations
const args = process.argv.slice(2);
const iterations = parseInt(args[0], 10) || 10_000_000;

if (!Number.isFinite(iterations) || iterations <= 0) {
  console.error('Please provide a positive integer for iterations.');
  process.exit(1);
}

console.log(`Starting Monte Carlo π calculation with ${iterations.toLocaleString()} points...`);
const startTime = Date.now();
calculatePi(iterations);
const elapsed = (Date.now() - startTime) / 1000;
console.log(`Calculation took ${elapsed.toFixed(2)} seconds.`);
