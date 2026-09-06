/**
 * Estimates pi with the Nilakantha series.
 *
 * The series starts at 3 and alternates:
 * 4/(2*3*4) - 4/(4*5*6) + 4/(6*7*8) ...
 *
 * It converges faster than the simple Leibniz series while staying small and
 * readable for this algorithm challenge.
 */
export function estimatePiNilakantha(terms: number) {
  if (!Number.isInteger(terms) || terms < 1) {
    throw new Error("Pi term count must be a positive integer.");
  }

  let estimate = 3;

  for (let termIndex = 1; termIndex <= terms; termIndex += 1) {
    const even = termIndex * 2;
    const denominator = even * (even + 1) * (even + 2);
    const sign = termIndex % 2 === 1 ? 1 : -1;

    estimate += sign * (4 / denominator);
  }

  return estimate;
}
