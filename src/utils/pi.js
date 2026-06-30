function calculatePI(iterations) {
  let inside = 0;
  for (let i = 0; i < iterations; i++) {
    const x = Math.random();
    const y = Math.random();
    if (x * x + y * y <= 1) inside++;
  }
  return (inside / iterations) * 4;
}

module.exports = { calculatePI };
