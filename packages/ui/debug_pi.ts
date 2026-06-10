function bigIntSqrt(v: bigint): bigint {
  if (v < 0n) throw new Error("Cannot sqrt negative");
  if (v < 2n) return v;
  let x0 = v >> 1n;
  if (x0 === 0n) x0 = 1n;
  let x1 = (x0 + v / x0) >> 1n;
  while (x1 < x0) { x0 = x1; x1 = (x0 + v / x0) >> 1n; }
  return x0;
}

function computePi(digits: number): string {
  const terms = Math.ceil(digits / 14.181647) + 1;
  const extra = 20;
  const prec = BigInt(digits + extra);
  const scale = 10n ** prec;
  const outScale = 10n ** BigInt(digits);

  const A = 13591409n;
  const B = 545140134n;
  const C3 = 640320n ** 3n;

  let sum = 0n;
  let num = 1n;
  let den = 1n;

  for (let k = 0; k < terms; k++) {
    const kk = BigInt(k);

    if (k > 0) {
      // Multiply by term_k / term_{k-1} ratio:
      // num_factor = (6k)(6k-1)(6k-2)(6k-3)(6k-4)(6k-5)
      for (let j = 0; j < 6; j++) {
        num *= 6n * kk - BigInt(5 - j);
      }
      // den_factor = k^3 * (3k)(3k-1)(3k-2) * C3
      den *= kk * kk * kk;
      den *= (3n * kk) * (3n * kk - 1n) * (3n * kk - 2n);
      den *= C3;
    }

    const termScaled = (num * (A + B * kk) * scale) / den;

    if (k % 2 === 0) sum += termScaled;
    else sum -= termScaled;
  }

  const sqrtTerm = bigIntSqrt(10005n * scale * scale);
  const numerator = 426880n * sqrtTerm;

  const piScaled = (numerator * outScale) / sum;

  const piStr = piScaled.toString();
  const expectedLen = digits + 1;
  const padded = piStr.padStart(expectedLen, "0");
  return padded[0] + "." + padded.slice(1);
}

const knOwn100 = "3.1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679";

const pi10 = computePi(10);
console.log('pi10:', pi10);
console.log('expected: 3.1415926535');
console.log('match:', pi10 === '3.1415926535');

const pi100 = computePi(100);
console.log('pi100:', pi100);
console.log('known:  ', knOwn100);
console.log('match:', pi100 === knOwn100);