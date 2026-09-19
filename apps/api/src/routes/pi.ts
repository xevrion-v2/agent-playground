import { Router } from "express";

const router = Router();

function computePI(digits: number): string {
  const guard = 10;
  const base = 10n ** BigInt(digits + guard);

  function arctanInverse(x: bigint): bigint {
    const x2 = x * x;
    let sum = 0n;
    let term = base / x;
    let k = 1n;
    let sign = 1n;
    while (term !== 0n) {
      sum += sign * (term / k);
      term = term / x2;
      sign = -sign;
      k += 2n;
    }
    return sum;
  }

  const pi = 4n * (4n * arctanInverse(5n) - arctanInverse(239n));
  const s = (pi / (10n ** BigInt(guard))).toString();
  return s[0] + "." + s.slice(1, digits + 1);
}

const PI_VALUE = computePI(1000);

router.get("/", (_req, res) => {
  res.json({
    data: { value: PI_VALUE, decimals: 1000 },
    message: "Note: π is transcendental and irrational — it cannot be expressed exactly. This endpoint returns a 1000-decimal-digit approximation computed via the Machin formula (4·arctan(1/5) − arctan(1/239))."
  });
});

export default router;
