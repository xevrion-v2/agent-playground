import { createPiCertificate, chunkPiPrefix } from "./index.mjs";

const digits = Number.parseInt(process.argv[2] ?? "100", 10);
const certificate = createPiCertificate(digits);
const { whole, chunks } = chunkPiPrefix(certificate.prefix, 50);

console.log(`pi finite prefix digits: ${certificate.decimalDigits}`);
console.log(`sha256: ${certificate.sha256}`);
console.log(`${whole}.${chunks.join(" ")}`);
