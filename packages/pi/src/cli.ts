import {
  calculatePiPrefix,
  createPiPrefixCertificate,
  explainPiExactnessLimit,
  piPrefixChunks
} from "./index.js";

const args = process.argv.slice(2);
const certificateMode = args.includes("--certificate");
const positionalArgs = args.filter((arg) => arg !== "--certificate");

const digits = Number.parseInt(positionalArgs[0] ?? "100", 10);
const chunkSizeArg = positionalArgs[1];
const chunkSize = chunkSizeArg === undefined ? undefined : Number.parseInt(chunkSizeArg, 10);

if (certificateMode) {
  console.log(JSON.stringify(createPiPrefixCertificate(digits, chunkSize), null, 2));
} else if (chunkSize === undefined) {
  console.log(calculatePiPrefix(digits));
} else {
  console.log([...piPrefixChunks(digits, chunkSize)].join(""));
}

console.error(explainPiExactnessLimit());
