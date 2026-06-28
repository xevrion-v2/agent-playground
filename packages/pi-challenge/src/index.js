export function calculatePi(iterations) {
  if (!Number.isInteger(iterations) || iterations < 1) {
    throw new RangeError("iterations must be a positive integer");
  }

  let pi = 3;
  let sign = 1;

  for (let n = 2; n < iterations + 2; n += 2) {
    pi += sign * 4 / (n * (n + 1) * (n + 2));
    sign *= -1;
  }

  return pi;
}
