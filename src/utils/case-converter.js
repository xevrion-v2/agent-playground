function splitWords(value) {
  if (value == null) return [];
  return String(value)
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/[_-]+/g, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map((part) => part.toLowerCase());
}

function toCamelCase(value) {
  const words = splitWords(value);
  if (!words.length) return "";
  return words[0] + words.slice(1).map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join("");
}

function toPascalCase(value) {
  const words = splitWords(value);
  return words.map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join("");
}

function toSnakeCase(value) {
  return splitWords(value).join("_");
}

function toKebabCase(value) {
  return splitWords(value).join("-");
}

module.exports = { toCamelCase, toSnakeCase, toKebabCase, toPascalCase };
