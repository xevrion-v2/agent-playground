function splitWords(value) {
  if (value === null || value === undefined) {
    return [];
  }

  const normalized = String(value)
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1 $2')
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .replace(/[^A-Za-z0-9]+/g, ' ')
    .trim();

  if (normalized === '') {
    return [];
  }

  return normalized.split(/\s+/).map((word) => word.toLowerCase());
}

function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

function toCamelCase(value) {
  const words = splitWords(value);
  if (words.length === 0) {
    return '';
  }

  return words[0] + words.slice(1).map(capitalize).join('');
}

function toSnakeCase(value) {
  return splitWords(value).join('_');
}

function toKebabCase(value) {
  return splitWords(value).join('-');
}

function toPascalCase(value) {
  return splitWords(value).map(capitalize).join('');
}

module.exports = {
  toCamelCase,
  toSnakeCase,
  toKebabCase,
  toPascalCase,
};
