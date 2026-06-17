/**
 * Creates an infinite sequence starting from `start`, incrementing by `step`.
 */
export function infiniteSequence(start = 0, step = 1) {
  let current = start;
  return {
    next: () => {
      const value = current;
      current += step;
      return value;
    },
    take: (count) => {
      const result = [];
      for (let i = 0; i < count; i++) result.push(current + i * step);
      current += count * step;
      return result;
    },
    peek: () => current,
  };
}
