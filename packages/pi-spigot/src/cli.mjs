import { createPiCertificate, formatPiPrefix, piPrefix } from "./index.mjs";

function parseIntegerArgument(value, fallback, name) {
  if (value === undefined) {
    return fallback;
  }

  const parsed = Number(value);

  if (!Number.isInteger(parsed)) {
    throw new RangeError(`${name} must be an integer`);
  }

  return parsed;
}

const decimalPlaces = parseIntegerArgument(process.argv[2], 100, "decimalPlaces");
const groupSize = parseIntegerArgument(process.argv[3], 10, "groupSize");
const prefix = piPrefix(decimalPlaces);
const certificate = createPiCertificate(decimalPlaces);

console.log(formatPiPrefix(prefix, groupSize));
console.log("");
console.log(`digits_after_decimal=${certificate.decimalPlaces}`);
console.log(`algorithm=${certificate.algorithm}`);
console.log(`sha256=${certificate.sha256}`);
console.log(`last_20_decimals=${certificate.lastTwentyDecimals}`);
console.log(`known_100_prefix_match=${certificate.known100PrefixMatch}`);
console.log(`note=${certificate.note}`);
