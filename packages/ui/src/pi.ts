/**
 * Chudnovsky algorithm for computing π to arbitrary precision.
 * Each term contributes ~14.18 decimal digits.
 */

function bigIntSqrt(v: bigint): bigint {
  if (v < 0n) throw new Error("Cannot sqrt negative");
  if (v < 2n) return v;
  let x0 = v >> 1n;
  if (x0 === 0n) x0 = 1n;
  let x1 = (x0 + v / x0) >> 1n;
  while (x1 < x0) {
    x0 = x1;
    x1 = (x0 + v / x0) >> 1n;
  }
  return x0;
}

export function computePi(digits: number): string {
  if (digits < 1) throw new Error("digits must be >= 1");

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
      for (let j = 0; j < 6; j++) {
        num *= 6n * kk - BigInt(5 - j);
      }
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

export function verifyPi(computed: string, reference: string): number {
  let matches = 0;
  const len = Math.min(computed.length, reference.length);
  for (let i = 0; i < len; i++) {
    if (computed[i] === reference[i]) matches++;
    else break;
  }
  return matches;
}

export const PI_1000 = "3.1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679" +
  "8214808651328230664709384460955058223172535940812848111745028410270193852110555964462294895493038196" +
  "4428810975665933446128475648233786783165271201909145648566923460348610454326648213393607260249141273" +
  "7245870066063155881748815209209628292540917153643678925903600113305305488204665213841469519415116094" +
  "3305727036575959195309218611738193261179310511854807446237996274956735188575272489122793818301194912" +
  "9833673362440656643086021394946395224737190702179860943702770539217176293176752384674818467669405132" +
  "0005681271452635608277857713427577896091736371787214684409012249534301465495853710507922796892589235" +
  "4201995611212902196086403441815981362977477130996051870721134999999837297804995105973173281609631859" +
  "5024459455346908302642522308253344685035261931188171010003137838752886587533208381420617177669147303" +
  "5982534904287554687311595628638823537875937519577818577805321712268066130019278766111959092164201989";
