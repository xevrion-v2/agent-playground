import { chunkPiPrefix, createPiCertificate, explainExactPiLimit } from "./src/index.js";

const digits = Number.parseInt(process.argv[2] ?? "100", 10);
const certificate = createPiCertificate(digits);

console.log(explainExactPiLimit());
console.log();
console.log(`digits=${certificate.digits}`);
console.log(`algorithm=${certificate.algorithm}`);
console.log(`sha256=${certificate.sha256}`);
console.log();
console.log(chunkPiPrefix(certificate.prefix, 52).join("\n"));
