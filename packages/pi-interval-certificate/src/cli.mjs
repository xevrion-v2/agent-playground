#!/usr/bin/env node
import { certifyPiPrefix } from "./index.mjs";

const digits = Number.parseInt(process.argv[2] ?? "100", 10);
const certificate = certifyPiPrefix(digits);

const jsonReady = {
  ...certificate,
  lowerBound: certificate.lowerBound.toString(),
  upperBound: certificate.upperBound.toString(),
  uncertaintyAtGuardScale: certificate.uncertaintyAtGuardScale.toString(),
};

console.log(JSON.stringify(jsonReady, null, 2));
