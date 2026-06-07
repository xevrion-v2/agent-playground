import { Router } from "express";

const router = Router();

// Nilakantha Series: converges fast
// Pi = 3 + 4/(2*3*4) - 4/(4*5*6) + 4/(6*7*8) - ...
function calculateNilakantha(iterations: number): number {
  let pi = 3.0;
  let sign = 1;
  for (let i = 1; i <= iterations; i++) {
    const term = 4.0 / ((2 * i) * (2 * i + 1) * (2 * i + 2));
    pi += sign * term;
    sign = -sign;
  }
  return pi;
}

// Leibniz Formula: simple but very slow convergence
// Pi = 4 * (1 - 1/3 + 1/5 - 1/7 + ...)
function calculateLeibniz(iterations: number): number {
  let pi = 0.0;
  let sign = 1;
  for (let i = 0; i < iterations; i++) {
    pi += sign * (4.0 / (2 * i + 1));
    sign = -sign;
  }
  return pi;
}

// Monte Carlo Method: Estimates Pi by throwing random points inside a unit square
function calculateMonteCarlo(iterations: number) {
  let inside = 0;
  for (let i = 0; i < iterations; i++) {
    const x = Math.random();
    const y = Math.random();
    if (x * x + y * y <= 1.0) {
      inside++;
    }
  }
  return {
    pi: (4.0 * inside) / iterations,
    inside,
    total: iterations
  };
}

router.get("/", (req, res) => {
  const method = (req.query.method as string || "nilakantha").toLowerCase();
  const iterations = parseInt(req.query.iterations as string || "100000", 10);

  if (isNaN(iterations) || iterations <= 0 || iterations > 10000000) {
    return res.status(400).json({
      error: "Invalid iterations value. Please provide an integer between 1 and 10,000,000."
    });
  }

  const start = process.hrtime.bigint();
  let resultValue = 0.0;
  let description = "";
  let details = undefined;

  if (method === "nilakantha") {
    resultValue = calculateNilakantha(iterations);
    description = "Nilakantha Series: Converges rapidly by adding alternating fractions with product denominators.";
  } else if (method === "leibniz") {
    resultValue = calculateLeibniz(iterations);
    description = "Leibniz Formula: Alternating series summing reciprocals of odd numbers. Simple but converges extremely slowly.";
  } else if (method === "montecarlo") {
    const mc = calculateMonteCarlo(iterations);
    resultValue = mc.pi;
    description = "Monte Carlo Simulation: Probabilistic estimation based on the ratio of random points landing inside a quadrant of a unit circle.";
    details = {
      pointsInsideCircle: mc.inside,
      totalPoints: mc.total
    };
  } else {
    return res.status(400).json({
      error: "Unknown method. Supported methods: nilakantha, leibniz, montecarlo"
    });
  }

  const end = process.hrtime.bigint();
  const timeMs = Number(end - start) / 1_000_000;

  res.json({
    success: true,
    method,
    iterations,
    pi: resultValue,
    accuracy: Math.abs(Math.PI - resultValue),
    timeMs,
    description,
    details
  });
});

export default router;
