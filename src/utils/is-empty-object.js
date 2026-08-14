const isEmptyObject = (input) => {
  if (input == null) return true;
  if (typeof input !== 'object' || Array.isArray(input)) return false;
  return Object.keys(input).length === 0;
};

module.exports = { isEmptyObject };
