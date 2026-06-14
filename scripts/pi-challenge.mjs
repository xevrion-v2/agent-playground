export function arctanSeries(x, terms = 12) {
  let sum = 0;

  for (let n = 0; n < terms; n += 1) {
    const exponent = 2 * n + 1;
    const term = (x ** exponent) / exponent;
    sum += n % 2 === 0 ? term : -term;
  }

  return sum;
}

export function calculatePi(terms = 12) {
  const pi = 16 * arctanSeries(1 / 5, terms) - 4 * arctanSeries(1 / 239, terms);
  return Number(pi.toFixed(15));
}

export function describePiApproach(terms = 12) {
  return {
    algorithm: "Machin-like formula",
    terms,
    pi: calculatePi(terms),
    notes: "Uses 16 * arctan(1/5) - 4 * arctan(1/239) with a deterministic truncated series."
  };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  console.log(JSON.stringify(describePiApproach(), null, 2));
}
