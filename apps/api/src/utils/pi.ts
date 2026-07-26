export function calculatePi(decimals: number = 100): string {
  // Machin-like formula: pi/4 = 4*arctan(1/5) - arctan(1/239)
  // Using arbitrary precision via BigInt
  const precision = BigInt(10) ** BigInt(decimals + 10);
  
  function arctan(denominator: number, terms: number): bigint {
    let sum = BigInt(0);
    let term = precision / BigInt(denominator);
    let n = 0;
    while (term > 0 && n < terms) {
      if (n % 2 === 0n) {
        sum += term;
      } else {
        sum -= term;
      }
      n++;
      term = term / BigInt(denominator * denominator);
    }
    return sum;
  }

  // pi = 16*arctan(1/5) - 4*arctan(1/239)
  const piBig = BigInt(16) * arctan(5, decimals) - BigInt(4) * arctan(239, decimals);
  
  const piStr = piBig.toString();
  const intPart = piStr.slice(0, 1);
  const decPart = piStr.slice(1, decimals + 1);
  
  return `${intPart}.${decPart}`;
}

export function calculatePiLeibniz(iterations: number = 1_000_000): number {
  let pi = 0;
  let sign = 1;
  for (let i = 0; i < iterations; i++) {
    pi += sign / (2 * i + 1);
    sign = -sign;
  }
  return pi * 4;
}
