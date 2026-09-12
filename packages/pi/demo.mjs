import { calculatePiPrefix, explainPiLimit } from "./src/index.mjs";

const digits = Number.parseInt(process.argv[2] ?? "100", 10);

console.log(calculatePiPrefix(digits));
console.log();
console.log(explainPiLimit());
