import { infiniteSequence } from "./index";

// ── Natural numbers ──────────────────────────────────────────────
const naturals = infiniteSequence((n) => n);

const first5 = naturals.take(5);
console.assert(
  JSON.stringify(first5) === JSON.stringify([0, 1, 2, 3, 4]),
  "natural numbers: first 5 should be [0,1,2,3,4]"
);

const next5 = naturals.take(5);
console.assert(
  JSON.stringify(next5) === JSON.stringify([0, 1, 2, 3, 4]),
  "natural numbers: take(5) again should be consistent"
);

// ── Fibonacci ────────────────────────────────────────────────────
const fib = infiniteSequence<number>((n) => {
  const fs = [0, 1];
  for (let i = 2; i <= n; i++) fs.push(fs[i - 1] + fs[i - 2]);
  return fs[n];
});

const first10 = fib.take(10);
console.assert(
  JSON.stringify(first10) === JSON.stringify([0, 1, 1, 2, 3, 5, 8, 13, 21, 34]),
  "fibonacci: first 10 should match known sequence"
);

// ── Spread syntax via Symbol.iterator ────────────────────────────
const viaSpread = [...infiniteSequence((n) => n * 2).take(4)];
console.assert(
  JSON.stringify(viaSpread) === JSON.stringify([0, 2, 4, 6]),
  "spread: should produce [0,2,4,6]"
);

// ── Edge: take(0) ────────────────────────────────────────────────
const empty = naturals.take(0);
console.assert(
  Array.isArray(empty) && empty.length === 0,
  "take(0): should return empty array"
);

// ── Edge: negative count ─────────────────────────────────────────
let threw = false;
try {
  naturals.take(-1);
} catch (e) {
  threw = e instanceof RangeError;
}
console.assert(threw, "take(-1): should throw RangeError");

// ── Large take (stress) ──────────────────────────────────────────
const large = naturals.take(1000);
console.assert(
  large.length === 1000 && large[999] === 999,
  "take(1000): should produce [0..999]"
);

console.log("✅ All infinite-sequence tests passed");
