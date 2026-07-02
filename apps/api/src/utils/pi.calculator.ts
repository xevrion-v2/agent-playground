// PI Calculation Utility using Leibniz Formula
export class PiCalculator {
  static calculate(iterations: number = 1000000): number {
    let pi = 0;
    for (let i = 0; i < iterations; i++) {
      pi += (i % 2 === 0 ? 1 : -1) / (2 * i + 1);
    }
    return 4 * pi;
  }
}

export default PiCalculator;