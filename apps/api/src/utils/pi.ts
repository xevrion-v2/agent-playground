/**
 * Calculates PI using the Leibniz formula for PI.
 *
 * The Leibniz formula states that:
 * 1 - 1/3 + 1/5 - 1/7 + 1/9 - ... = PI/4
 *
 * This approach is chosen for its simplicity and ease of implementation,
 * making it a great lightweight algorithm challenge. While it converges
 * very slowly compared to modern algorithms (like Chudnovsky), it clearly
 * demonstrates basic loop mechanics and alternating series.
 *
 * @param iterations The number of terms to compute in the series. Higher means more accuracy.
 * @returns An approximation of PI.
 */
export function calculatePiLeibniz(iterations: number = 1000000): number {
  let piOver4 = 0;
  let denominator = 1;
  let sign = 1;

  for (let i = 0; i < iterations; i++) {
    piOver4 += sign * (1 / denominator);
    denominator += 2;
    sign *= -1;
  }

  return piOver4 * 4;
}
