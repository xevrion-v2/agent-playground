const parseDate = (input) => {
  if (input == null) return undefined;
  const value = input instanceof Date ? input : new Date(input);
  if (Number.isNaN(value.getTime())) return undefined;
  return new Date(value.getTime());
};

module.exports = { parseDate };
