import { calculatePiPrefix, explainPiLimit } from "./index.js";

const requestedDigits = Number.parseInt(process.argv[2] ?? "100", 10);

console.log(explainPiLimit());
console.log(calculatePiPrefix(requestedDigits));
