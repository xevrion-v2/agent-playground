export function calculatePi(iterations = 3): number {
  if (!Number.isInteger(iterations) || iterations < 1) {
    throw new RangeError("iterations must be a positive integer");
  }

  let arithmeticMean = 1;
  let geometricMean = 1 / Math.sqrt(2);
  let correction = 0.25;
  let scale = 1;

  for (let index = 0; index < iterations; index += 1) {
    const nextArithmeticMean = (arithmeticMean + geometricMean) / 2;
    const nextGeometricMean = Math.sqrt(arithmeticMean * geometricMean);
    const delta = arithmeticMean - nextArithmeticMean;

    correction -= scale * delta * delta;
    arithmeticMean = nextArithmeticMean;
    geometricMean = nextGeometricMean;
    scale *= 2;
  }

  const sum = arithmeticMean + geometricMean;
  return (sum * sum) / (4 * correction);
}
