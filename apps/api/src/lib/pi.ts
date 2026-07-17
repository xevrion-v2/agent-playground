/**
 * Arbitrary-precision digits of PI using Jeremy Gibbons' unbounded spigot
 * algorithm (https://www.cs.ox.ac.uk/people/jeremy.gibbons/publications/spigot.pdf).
 *
 * `computePi(digits)` returns a string "3.dddd..." with exactly `digits` decimal
 * places. The algorithm is exact: each emitted digit is correct, so the result
 * matches known PI digits for any requested precision (unlike a fixed IEEE-754
 * `Math.PI`, which caps out near 15-16 decimal digits).
 */
export function computePi(digits: number): string {
  if (!Number.isInteger(digits) || digits < 0) {
    throw new Error("digits must be a non-negative integer");
  }
  if (digits === 0) return "3";

  let q = 1n;
  let r = 0n;
  let t = 1n;
  let k = 1n;
  let n = 3n;
  let l = 3n;
  const out: string[] = [];

  while (out.length < digits + 1) {
    if (4n * q + r - t < n * t) {
      out.push(n.toString());
      const rq = 10n * q;
      const rr = 10n * (r - n * t);
      const rn = (10n * (3n * q + r)) / t - 10n * n;
      q = rq;
      r = rr;
      n = rn;
    } else {
      const rq = q * k;
      const rr = (2n * q + r) * l;
      const rt = t * l;
      const rk = k + 1n;
      const rn = (q * (7n * k + 2n) + r * l) / (t * l);
      const rl = l + 2n;
      q = rq;
      r = rr;
      t = rt;
      k = rk;
      n = rn;
      l = rl;
    }
  }

  return `3.${out.slice(1).join("")}`;
}
