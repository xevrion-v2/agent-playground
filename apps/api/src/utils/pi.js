/**
 * PI Calculator using Machin's formula with BigInt arbitrary precision.
 * π/4 = 4·arctan(1/5) - arctan(1/239)
 * 
 * This converges at ~1.4 digits per iteration, making it practical
 * for thousands of decimal places with BigInt.
 *
 * @param {number} decimals - Number of decimal places (default: 100)
 * @returns {string} PI to the requested precision
 */
export function calculatePi(decimals = 100) {
  const guard = 10;
  const prec = BigInt(10) ** BigInt(decimals + guard);

  function arctanInv(n) {
    const nBig = BigInt(n);
    const nSq = nBig * nBig;
    let total = prec / nBig;
    let term = total;
    let k = 1n;
    
    while (term > 0n) {
      term = term / nSq;
      k += 2n;
      total += (k % 4n === 3n) ? -(term / k) : (term / k);
    }
    return total;
  }

  // π = 16·arctan(1/5) - 4·arctan(1/239)
  let pi = 16n * arctanInv(5) - 4n * arctanInv(239);
  pi = pi / BigInt(10) ** BigInt(guard);

  const str = pi.toString();
  const len = str.length;

  if (len <= decimals) {
    return "3." + str.padStart(decimals, '0');
  }
  return str.slice(0, len - decimals) + "." + str.slice(len - decimals);
}
