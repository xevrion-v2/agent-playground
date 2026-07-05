const crypto = require("crypto");

const DEFAULT_CHARS =
  "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

function randomString(length = 8, charset = DEFAULT_CHARS) {
  if (!Number.isFinite(length) || length <= 0) return "";
  if (!charset || typeof charset !== "string" || charset.length === 0) return "";
  let out = "";
  for (let i = 0; i < length; i += 1) {
    const idx = crypto.randomInt(0, charset.length);
    out += charset[idx];
  }
  return out;
}

function randomInt(min, max) {
  if (!Number.isFinite(min) || !Number.isFinite(max)) {
    throw new TypeError("min and max must be finite numbers");
  }
  const lo = Math.ceil(Math.min(min, max));
  const hi = Math.floor(Math.max(min, max));
  if (lo > hi) {
    throw new RangeError("invalid range");
  }
  return crypto.randomInt(lo, hi + 1);
}

function randomUUID() {
  return crypto.randomUUID();
}

function randomPick(items) {
  if (!Array.isArray(items) || items.length === 0) return undefined;
  return items[crypto.randomInt(0, items.length)];
}

module.exports = { randomString, randomInt, randomUUID, randomPick };
