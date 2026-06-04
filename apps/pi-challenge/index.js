/**
 * PI calculation using the Nilakantha series.
 * Converges faster than the Leibniz series for the same number of iterations.
 *
 * Nilakantha: π = 3 + 4/(2·3·4) - 4/(4·5·6) + 4/(6·7·8) - ...
 */

function calculatePi(iterations = 1000) {
  let pi = 3;
  let sign = 1;
  for (let i = 1; i <= iterations; i++) {
    const k = 2 * i;
    pi += sign * 4 / (k * (k + 1) * (k + 2));
    sign *= -1;
  }
  return pi;
}

const iterations = parseInt(process.env.PI_ITERATIONS || '1000', 10);
const result = calculatePi(iterations);
console.log(`PI ≈ ${result} (after ${iterations} Nilakantha iterations)`);
console.log(`Math.PI = ${Math.PI}`);
console.log(`Error   = ${Math.abs(result - Math.PI)}`);
