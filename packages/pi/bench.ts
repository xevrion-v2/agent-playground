import { computePiDigits } from "./src/index.js";

for (const n of [100, 1_000, 10_000, 100_000, 1_000_000]) {
  const t = performance.now();
  const v = computePiDigits(n);
  console.log(
    `${n.toLocaleString().padStart(9)} digits: ${(performance.now() - t).toFixed(1).padStart(9)} ms  tail: ...${v.slice(-12)}`,
  );
}
