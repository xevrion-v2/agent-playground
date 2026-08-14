const toKebabCase = (input) => {
  if (input == null) return '';
  const text = typeof input === 'string' ? input : String(input);
  return text
    .replace(/([a-z0-9])([A-Z])/g, '-')
    .replace(/[^a-zA-Z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .toLowerCase();
};

module.exports = { toKebabCase };
