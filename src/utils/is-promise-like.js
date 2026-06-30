const isPromiseLike = (input) => {
  if (input == null) return false;
  return typeof input === 'object' && typeof input.then === 'function';
};

module.exports = { isPromiseLike };
