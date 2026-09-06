#!/usr/bin/env node
/**
 * PI Calculator — Nilakantha Series
 *
 * The Nilakantha series converges to π much faster than the Leibniz formula.
 * It was discovered by the Indian mathematician Nilakantha Somayaji (c. 1500).
 *
 * Formula:
 *   π = 3 + 4/(2·3·4) − 4/(4·5·6) + 4/(6·7·8) − 4/(8·9·10) + …
 *
 * General term:
 *   a(n) = (-1)^(n+1) * 4 / (2n · (2n+1) · (2n+2))   for n ≥ 1
 *
 * After N terms the approximation is:
 *   π ≈ 3 + Σ a(n),  n = 1..N
 *
 * Accuracy:
 *   - 100 terms  → ~6 correct decimal places
 *   - 1 000 terms → ~9 correct decimal places
 *   - 10 000 terms → ~12 correct decimal places
 *
 * Usage:
 *   node scripts/calculate-pi.js [terms]
 *
 * The default is 10 000 terms.
 */

const terms = parseInt(process.argv[2], 10) || 10_000;

// Use fixed-point arithmetic with 105 decimal digits of precision
const SCALE = 10n ** 105n;
let pi = 3n * SCALE;

for (let n = 1; n <= terms; n++) {
  const d = BigInt(2 * n) * BigInt(2 * n + 1) * BigInt(2 * n + 2);
  const sign = n % 2 === 1 ? 1n : -1n;
  pi += (sign * 4n * SCALE * SCALE) / (d * SCALE);
}

const piStr = pi.toString().padStart(106, "0");
const intPart = piStr[0];
const decimals = piStr.slice(1);

console.log(`π  ≈ ${intPart}.${decimals}`);
console.log(`   (${terms} Nilakantha terms)`);

// Reference value for comparison
const REF =
  "3.1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679";
const approx = `${intPart}.${decimals.slice(0, 99)}`;

let correct = 0;
for (let i = 0; i < REF.length; i++) {
  if (REF[i] === approx[i]) correct++;
  else break;
}

console.log(`   ${correct} digits match the reference value`);
