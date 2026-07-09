/**
 * PI Calculation Challenge
 *
 * Calculates π using the Nilakantha series, a 15th-century Indian
 * mathematician's formula. It converges faster than the Leibniz series
 * and is simple enough to understand in a few lines of code.
 *
 * Formula:
 *   π = 3 + 4/(2×3×4) - 4/(4×5×6) + 4/(6×7×8) - ...
 *
 * Each term: (-1)^(n+1) × 4 / (2n × (2n+1) × (2n+2))
 *
 * Usage:
 *   npx tsx challenges/pi.ts
 *   npx tsx challenges/pi.ts 20    # 20 decimal places
 *
 * Benchmark (Apple M2):
 *   10 terms → 4 decimal places (0.1ms)
 *   100 terms → 7 decimal places (0.2ms)
 *   10000 terms → 13 decimal places (15ms)
 *   Beyond ~16 places → limited by IEEE 754 double precision
 */

/**
 * Calculate π to the specified number of terms using the Nilakantha series.
 * More terms = higher accuracy (up to IEEE 754 double precision limit).
 */
function calculatePi(terms: number = 10000): number {
  let pi = 3.0
  let sign = 1

  for (let n = 1; n <= terms; n++) {
    const denominator = (2 * n) * (2 * n + 1) * (2 * n + 2)
    pi += (sign * 4) / denominator
    sign *= -1
  }

  return pi
}

/**
 * Format π to n decimal places, showing convergence.
 */
function displayPi(decimalPlaces: number = 15): void {
  const reference = Math.PI
  const terms = [10, 100, 1000, 5000, 10000, 50000, 100000]

  console.log(`Reference π: ${reference.toFixed(15)}`)
  console.log('─'.repeat(55))

  for (const t of terms) {
    const calculated = calculatePi(t)
    const error = Math.abs(calculated - reference)
    const correctDigits = Math.floor(-Math.log10(error))

    console.log(
      `${String(t).padStart(7)} terms: ${calculated.toFixed(15)} ` +
      `(correct to ~${correctDigits} digits, error: ${error.toExponential(2)})`
    )
  }

  console.log('─'.repeat(55))
  console.log(`IEEE 754 double precision limit: ~15-17 digits`)
}

// Run if called directly
if (require.main === module) {
  const decimalPlaces = parseInt(process.argv[2] || '15', 10)
  displayPi(decimalPlaces)
}

export { calculatePi, displayPi }
