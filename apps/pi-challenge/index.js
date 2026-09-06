function calculatePi(iterations = 5000) {
  let pi = 3;
  let sign = 1;

  for (let i = 2; i < 2 + iterations * 2; i += 2) {
    pi += sign * (4 / (i * (i + 1) * (i + 2)));
    sign *= -1;
  }

  return pi;
}

function parseIterations(value) {
  if (!value) {
    return 5000;
  }

  const parsed = Number.parseInt(value, 10);

  if (Number.isNaN(parsed) || parsed <= 0) {
    throw new Error('Iterations must be a positive integer.');
  }

  return parsed;
}

function formatResult(iterations, estimate) {
  const error = Math.abs(Math.PI - estimate);

  return [
    'PI Calculation Challenge',
    `Iterations: ${iterations}`,
    `Estimate:   ${estimate}`,
    `Math.PI:    ${Math.PI}`,
    `Abs error:  ${error}`
  ].join('\n');
}

try {
  const iterations = parseIterations(process.argv[2]);
  const estimate = calculatePi(iterations);

  console.log(formatResult(iterations, estimate));
} catch (error) {
  console.error(error.message);
  process.exit(1);
}

module.exports = {
  calculatePi
};
