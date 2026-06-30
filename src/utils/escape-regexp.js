const escapeRegExp = (input) => {
  if (input == null) return '';
  const text = typeof input === 'string' ? input : String(input);
  return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};

module.exports = { escapeRegExp };