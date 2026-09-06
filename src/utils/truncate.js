const truncate = (input, maxLength = 50, ellipsis = '...') => {
  if (input == null) return '';
  const text = typeof input === 'string' ? input : String(input);
  const limit = Math.max(0, Math.floor(maxLength));
  return text.length <= limit ? text : text.slice(0, limit) + ellipsis;
};

module.exports = { truncate };
