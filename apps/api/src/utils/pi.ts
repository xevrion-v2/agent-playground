export interface PiEstimate {
  algorithm: "nilakantha";
  terms: number;
  value: number;
}

/**
 * Estimate PI with the Nilakantha series:
 * 3 + 4/(2*3*4) - 4/(4*5*6) + 4/(6*7*8) ...
 *
 * The series is lightweight, easy to audit, and converges faster than the
 * Leibniz series while still using only basic arithmetic.
 */
export function estimatePi(terms = 1000): PiEstimate {
  if (!Number.isInteger(terms) || terms < 1) {
    throw new RangeError("terms must be a positive integer");
  }

  let value = 3;

  for (let index = 0; index < terms; index += 1) {
    const base = 2 + index * 2;
    const fraction = 4 / (base * (base + 1) * (base + 2));
    value += index % 2 === 0 ? fraction : -fraction;
  }

  return {
    algorithm: "nilakantha",
    terms,
    value
  };
}
