import { calculatePiPrefix, explainPiExactnessLimit, piPrefixChunks } from "./index.js";

const digits = Number.parseInt(process.argv[2] ?? "100", 10);
const chunkSizeArg = process.argv[3];
const chunkSize = chunkSizeArg === undefined ? undefined : Number.parseInt(chunkSizeArg, 10);

if (chunkSize === undefined) {
  console.log(calculatePiPrefix(digits));
} else {
  console.log([...piPrefixChunks(digits, chunkSize)].join(""));
}

console.error(explainPiExactnessLimit());
