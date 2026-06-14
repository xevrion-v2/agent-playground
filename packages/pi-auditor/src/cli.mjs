#!/usr/bin/env node
import { buildPiCertificate, explainFinitePiTarget } from "./index.mjs";

const decimalPlaces = Number.parseInt(process.argv[2] ?? "100", 10);
const groupSize = Number.parseInt(process.argv[3] ?? "10", 10);
const certificate = buildPiCertificate(decimalPlaces, { groupSize });

console.log(certificate.chunks.join(" "));
console.log(`decimal_places=${certificate.decimalPlaces}`);
console.log(`algorithm=${certificate.algorithm}`);
console.log(`sha256=${certificate.sha256}`);
console.log(`known_prefix_matched=${certificate.knownPrefixMatched}`);
console.log(`note=${explainFinitePiTarget()}`);
