import { createHash } from "node:crypto";

export const ISSUE_17_PREFIX_100 =
  "3.1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679";

const DEFAULT_DECIMAL_PLACES = 100;
const MAX_DECIMAL_PLACES = 10000;

function assertNonNegativeInteger(name, value) {
  if (!Number.isInteger(value) || value < 0) {
    throw new RangeError(`${name} must be a non-negative integer`);
  }
}

function assertDigitBudget(decimalPlaces) {
  assertNonNegativeInteger("decimalPlaces", decimalPlaces);

  if (decimalPlaces > MAX_DECIMAL_PLACES) {
    throw new RangeError(`decimalPlaces must be <= ${MAX_DECIMAL_PLACES}`);
  }
}

export function* piDigitStream() {
  let q = 1n;
  let r = 0n;
  let t = 1n;
  let k = 1n;
  let n = 3n;
  let l = 3n;

  while (true) {
    if (4n * q + r - t < n * t) {
      yield Number(n);

      const nextR = 10n * (r - n * t);
      const nextN = (10n * (3n * q + r)) / t - 10n * n;
      q *= 10n;
      r = nextR;
      n = nextN;
    } else {
      const nextR = (2n * q + r) * l;
      const nextN = (q * (7n * k) + 2n + r * l) / (t * l);
      q *= k;
      t *= l;
      l += 2n;
      k += 1n;
      n = nextN;
      r = nextR;
    }
  }
}

export function piPrefix(decimalPlaces = DEFAULT_DECIMAL_PLACES) {
  assertDigitBudget(decimalPlaces);

  const stream = piDigitStream();
  const integerPart = stream.next().value;

  if (decimalPlaces === 0) {
    return String(integerPart);
  }

  const decimals = [];

  for (let index = 0; index < decimalPlaces; index += 1) {
    decimals.push(String(stream.next().value));
  }

  return `${integerPart}.${decimals.join("")}`;
}

export function piDecimalWindow(offset, count) {
  assertNonNegativeInteger("offset", offset);
  assertDigitBudget(count);

  if (offset + count > MAX_DECIMAL_PLACES) {
    throw new RangeError(`offset + count must be <= ${MAX_DECIMAL_PLACES}`);
  }

  const stream = piDigitStream();
  stream.next();

  for (let skipped = 0; skipped < offset; skipped += 1) {
    stream.next();
  }

  const digits = [];

  for (let index = 0; index < count; index += 1) {
    digits.push(String(stream.next().value));
  }

  return digits.join("");
}

export function createPiCertificate(decimalPlaces = DEFAULT_DECIMAL_PLACES) {
  const prefix = piPrefix(decimalPlaces);
  const decimalPart = prefix.includes(".") ? prefix.split(".")[1] : "";

  return {
    algorithm: "unbounded-spigot-bigint",
    decimalPlaces,
    sha256: createHash("sha256").update(prefix).digest("hex"),
    firstTwenty: prefix.slice(0, 22),
    lastTwentyDecimals: decimalPart.slice(-20),
    known100PrefixMatch:
      decimalPlaces >= 100
        ? prefix.slice(0, ISSUE_17_PREFIX_100.length) === ISSUE_17_PREFIX_100
        : null,
    note:
      "PI has no final decimal digit; this certifies the exact finite prefix emitted for the requested precision."
  };
}

export function formatPiPrefix(prefix, groupSize = 10, groupsPerLine = 7) {
  assertNonNegativeInteger("groupSize", groupSize);
  assertNonNegativeInteger("groupsPerLine", groupsPerLine);

  if (groupSize === 0 || groupsPerLine === 0) {
    throw new RangeError("groupSize and groupsPerLine must be greater than 0");
  }

  const [integerPart, decimalPart = ""] = prefix.split(".");

  if (decimalPart.length === 0) {
    return integerPart;
  }

  const groups = decimalPart.match(new RegExp(`.{1,${groupSize}}`, "g")) ?? [];
  const lines = [];

  for (let index = 0; index < groups.length; index += groupsPerLine) {
    lines.push(groups.slice(index, index + groupsPerLine).join(" "));
  }

  return `${integerPart}.${lines.join("\n")}`;
}
