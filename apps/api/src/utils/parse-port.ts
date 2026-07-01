export function parsePort(value: string | number): number {
  const normalized = typeof value === "string" ? value.trim() : value;

  if (typeof normalized === "string") {
    if (normalized.length === 0 || !/^\d+$/.test(normalized)) {
      throw new TypeError("port must be a non-empty integer string");
    }
  } else if (!Number.isInteger(normalized)) {
    throw new TypeError("port must be an integer");
  }

  const port = Number(normalized);

  if (port < 0 || port > 65_535) {
    throw new RangeError("port must be between 0 and 65535");
  }

  return port;
}
