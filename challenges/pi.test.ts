import { describe, it, expect } from 'vitest'
import { calculatePi } from './pi'

describe('PI calculation (Nilakantha series)', () => {
  const REFERENCE_PI = Math.PI

  it('should approximate π within 0.1 after 10 terms', () => {
    const pi = calculatePi(10)
    expect(Math.abs(pi - REFERENCE_PI)).toBeLessThan(0.1)
  })

  it('should approximate π within 1e-5 after 1000 terms', () => {
    const pi = calculatePi(1000)
    expect(Math.abs(pi - REFERENCE_PI)).toBeLessThan(1e-5)
  })

  it('should converge monotonically as terms increase', () => {
    const pi10 = calculatePi(10)
    const pi100 = calculatePi(100)
    const pi1000 = calculatePi(1000)

    const err10 = Math.abs(pi10 - REFERENCE_PI)
    const err100 = Math.abs(pi100 - REFERENCE_PI)
    const err1000 = Math.abs(pi1000 - REFERENCE_PI)

    expect(err100).toBeLessThan(err10)
    expect(err1000).toBeLessThan(err100)
  })

  it('should return exactly 3.0 for 0 terms (base case)', () => {
    const pi = calculatePi(0)
    expect(pi).toBe(3.0)
  })

  it('should yield a value close to Math.PI', () => {
    const pi = calculatePi(10000)
    expect(pi).toBeCloseTo(REFERENCE_PI, 5)
  })

  it('should be deterministic — same input gives same output', () => {
    const a = calculatePi(500)
    const b = calculatePi(500)
    expect(a).toBe(b)
  })

  it('should always be between 3.0 and 3.2', () => {
    for (const terms of [1, 10, 100, 1000]) {
      const pi = calculatePi(terms)
      expect(pi).toBeGreaterThan(3.0)
      expect(pi).toBeLessThan(3.2)
    }
  })
})
