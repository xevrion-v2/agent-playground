/**
 * PI Calculation Challenge — Monte Carlo Method
 *
 * Challenge: estimate π by throwing random darts at a unit square
 * and checking the ratio that land inside the inscribed quarter circle.
 */

function monteCarloPi(samples: number): number {
  let inside = 0;
  for (let i = 0; i < samples; i++) {
    const x = Math.random();
    const y = Math.random();
    if (x * x + y * y <= 1.0) inside++;
  }
  return (4.0 * inside) / samples;
}

// Run challenge
const trials = parseInt(process.argv[2] || "1000000", 10);
console.log(`🎯 PI Calculation Challenge — ${trials.toLocaleString()} samples`);
const pi = monteCarloPi(trials);
console.log(`Estimated π = ${pi}`);
console.log(`Actual   π = ${Math.PI}`);
console.log(`Error      = ${Math.abs(pi - Math.PI).toFixed(8)}`);
