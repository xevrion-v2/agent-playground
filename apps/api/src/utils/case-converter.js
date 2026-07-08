function toWords(value) {
  if (value == null) {
    return [];
  }

  const text = String(value)
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();

  if (!text) {
    return [];
  }

  return text
    .replace(/([A-Z]+)([A-Z][a-z])/g, "$1 $2")
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/[^a-zA-Z0-9]+/g, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map((word) => word.toLowerCase());
}

function capitalize(word) {
  return word ? word[0].toUpperCase() + word.slice(1) : "";
}

export function toCamelCase(value) {
  const words = toWords(value);
  if (words.length === 0) {
    return "";
  }

  const [first, ...rest] = words;
  return [first, ...rest.map(capitalize)].join("");
}

export function toSnakeCase(value) {
  const words = toWords(value);
  return words.join("_");
}

export function toKebabCase(value) {
  const words = toWords(value);
  return words.join("-");
}

export function toPascalCase(value) {
  const words = toWords(value);
  return words.map(capitalize).join("");
}

export default {
  toCamelCase,
  toSnakeCase,
  toKebabCase,
  toPascalCase,
};
