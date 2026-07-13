import { getExactPi, getPiExplanation, getPiApprox } from "../src/exactPi";

function assert(cond: boolean, msg: string): void {
  if (!cond) throw new Error(msg);
}

assert(getExactPi() === "\u03C0", "exact value must be the symbol pi");
assert(
  getPiExplanation().includes("infinite"),
  "explanation must state infinite expansion"
);
assert(getPiApprox(10).startsWith("3.1415926535"), "approx prefix");
assert(getPiApprox(0) === "3", "zero digits");
console.log("exactPi tests passed");
