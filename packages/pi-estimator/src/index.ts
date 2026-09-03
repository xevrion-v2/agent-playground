export type PiEstimate = {
  algorithm: "nilakantha";
  terms: number;
  value: number;
};

function assertTermCount(terms: number) {
  if (!Number.isInteger(terms) || terms < 0) {
    throw new RangeError("terms must be a non-negative integer");
  }
}

/**
 * Estimates PI with the Nilakantha series.
 *
 * The algorithm is slower than production-grade methods such as Chudnovsky,
 * but it is compact, dependency-free, and easy to audit for an algorithm
 * challenge. More terms produce a closer approximation to Math.PI.
 */
export function estimatePi(terms: number): PiEstimate {
  assertTermCount(terms);

  let value = 3;

  for (let index = 0; index < terms; index += 1) {
    const n = 2 + index * 2;
    const sign = index % 2 === 0 ? 1 : -1;
    value += sign * (4 / (n * (n + 1) * (n + 2)));
  }

  return {
    algorithm: "nilakantha",
    terms,
    value
  };
}

export function formatPi(estimate: PiEstimate, digits = 6): string {
  if (!Number.isInteger(digits) || digits < 0 || digits > 20) {
    throw new RangeError("digits must be an integer between 0 and 20");
  }

  return estimate.value.toFixed(digits);
}
