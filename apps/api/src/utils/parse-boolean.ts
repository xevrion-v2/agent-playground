const truthyValues = new Set(["true", "1", "yes", "on"]);
const falsyValues = new Set(["false", "0", "no", "off"]);

export function parseBoolean(
  value: string | boolean | undefined,
  fallback = false,
) {
  if (typeof value === "boolean") {
    return value;
  }

  if (!value) {
    return fallback;
  }

  const normalized = value.trim().toLowerCase();

  if (truthyValues.has(normalized)) {
    return true;
  }

  if (falsyValues.has(normalized)) {
    return false;
  }

  return fallback;
}