export function runBenchmarkSuite(evaluations: Array<{ test: string; score: number }>) {
  const avg = evaluations.reduce((acc, e) => acc + e.score, 0) / evaluations.length;
  return { passed: avg >= 0.8, averageScore: avg };
}
