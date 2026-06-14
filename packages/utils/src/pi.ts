/**
 * PI 计算方法 — 三种算法对比
 *
 * 1. Leibniz 级数: π/4 = 1 - 1/3 + 1/5 - 1/7 + ...
 *    收敛速度: 约 1000 项精确到小数点后 3 位
 *
 * 2. BBP 公式: Bailey–Borwein–Plouffe 公式
 *    π = Σ (1/16^k) * [4/(8k+1) - 2/(8k+4) - 1/(8k+5) - 1/(8k+6)]
 *    收敛速度: 10 项即可达到 1e-8 精度
 *
 * 3. 蒙特卡洛方法: 随机点在单位正方形内, 落在四分之一圆内的比例 * 4
 *    O(1/√N) 收敛, 精度依赖于随机采样数量
 */

/**
 * 使用 Leibniz 级数计算 PI 的近似值
 *
 * @param terms 级数项数（越大越精确，默认 1000000）
 * @returns PI 的近似值
 */
export function piLeibniz(terms: number = 1_000_000): number {
  let sum = 0;
  for (let i = 0; i < terms; i++) {
    sum += (i % 2 === 0 ? 1 : -1) / (2 * i + 1);
  }
  return sum * 4;
}

/**
 * 使用 BBP 公式计算 PI 的近似值
 *
 * 收敛速度极快，适合高精度场景。默认 10 项精度优于双精度浮点数。
 *
 * @param iterations 迭代次数（默认 10）
 * @returns PI 的近似值
 */
export function piBBP(iterations: number = 10): number {
  let pi = 0;
  for (let k = 0; k < iterations; k++) {
    const k8 = 8 * k;
    const term =
      4 / (k8 + 1) -
      2 / (k8 + 4) -
      1 / (k8 + 5) -
      1 / (k8 + 6);
    pi += term / Math.pow(16, k);
  }
  return pi;
}

/**
 * 使用蒙特卡洛方法计算 PI 的近似值
 *
 * @param samples 随机采样点数量（默认 1000000）
 * @returns PI 的近似值
 */
export function piMonteCarlo(samples: number = 1_000_000): number {
  let inside = 0;
  for (let i = 0; i < samples; i++) {
    const x = Math.random();
    const y = Math.random();
    if (x * x + y * y <= 1) {
      inside++;
    }
  }
  return (inside / samples) * 4;
}

/**
 * 对比三种方法的精度
 *
 * @returns 包含三种算法结果和误差的对象
 */
export function comparePiMethods(): {
  leibniz: number;
  bbp: number;
  monteCarlo: number;
  actual: number;
} {
  return {
    leibniz: piLeibniz(1_000_000),
    bbp: piBBP(10),
    monteCarlo: piMonteCarlo(1_000_000),
    actual: Math.PI,
  };
}
