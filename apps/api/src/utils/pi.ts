export function calculatePi(decimals: number = 100): string {
  const precision = BigInt(10) ** BigInt(decimals + 10);
  
  function arctan(denominator: number, terms: number): bigint {
    let sum = BigInt(0);
    let term = precision / BigInt(denominator);
    let n = 0;
    while (term > 0 && n < terms) {
      if (n % 2 === 0n) sum += term;
      else sum -= term;
      n++;
      term = term / BigInt(denominator * denominator);
    }
    return sum;
  }

  const piBig = BigInt(16) * arctan(5, decimals) - BigInt(4) * arctan(239, decimals);
  const piStr = piBig.toString();
  return `${piStr[0]}.${piStr.slice(1, decimals + 1)}`;
}
