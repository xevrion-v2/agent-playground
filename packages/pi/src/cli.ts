import { calculatePiPrefix, formatGroupedPiPrefix } from "./index";

const digits = Number.parseInt(process.argv[2] ?? "100", 10);
const groupSize = Number.parseInt(process.argv[3] ?? "10", 10);
const prefix = calculatePiPrefix(digits);

console.log(formatGroupedPiPrefix(prefix, groupSize));
console.log(`digits_after_decimal=${digits}`);
console.log("note=pi has no finite exact decimal expansion; this is an exact finite prefix");
