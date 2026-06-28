import { describe, it, expect } from 'vitest'
import { fibonacci, naturals, primes } from './infinite-sequence'

describe('Fibonacci sequence', () => {
  const fib = fibonacci()

  it('should start with 0, 1, 1, 2, 3, 5', () => {
    expect(fib.nth(0)).toBe(0)
    expect(fib.nth(1)).toBe(1)
    expect(fib.nth(2)).toBe(1)
    expect(fib.nth(3)).toBe(2)
    expect(fib.nth(4)).toBe(3)
    expect(fib.nth(5)).toBe(5)
  })

  it('should return correct value at n=10', () => {
    expect(fib.nth(10)).toBe(55)
  })

  it('take() should limit iteration safely', () => {
    const values = [...fib.take(6)]
    expect(values).toEqual([0, 1, 1, 2, 3, 5])
  })

  it('take(0) should produce empty iterable', () => {
    expect([...fib.take(0)]).toEqual([])
  })
})

describe('Natural numbers', () => {
  const nat = naturals()

  it('should start with 0, 1, 2, 3', () => {
    expect(nat.nth(0)).toBe(0)
    expect(nat.nth(1)).toBe(1)
    expect(nat.nth(2)).toBe(2)
    expect(nat.nth(3)).toBe(3)
  })

  it('take(5) should give [0, 1, 2, 3, 4]', () => {
    expect([...nat.take(5)]).toEqual([0, 1, 2, 3, 4])
  })
})

describe('Prime numbers', () => {
  const p = primes()

  it('should start with 2, 3, 5, 7, 11', () => {
    expect(p.nth(0)).toBe(2)
    expect(p.nth(1)).toBe(3)
    expect(p.nth(2)).toBe(5)
    expect(p.nth(3)).toBe(7)
    expect(p.nth(4)).toBe(11)
  })

  it('nth(9) should be 29 (the 10th prime)', () => {
    expect(p.nth(9)).toBe(29)
  })

  it('take(5) should give first 5 primes', () => {
    expect([...p.take(5)]).toEqual([2, 3, 5, 7, 11])
  })

  it('should only produce primes (verify first 20)', () => {
    const isPrime = (n: number) => {
      for (let i = 2; i <= Math.sqrt(n); i++) {
        if (n % i === 0) return false
      }
      return n >= 2
    }
    for (const value of p.take(20)) {
      expect(isPrime(value)).toBe(true)
    }
  })
})

describe('Safety: no infinite loops', () => {
  it('fibonacci.take(1000) should complete in reasonable time', () => {
    const start = Date.now()
    const result = [...fibonacci().take(1000)]
    expect(result.length).toBe(1000)
    expect(Date.now() - start).toBeLessThan(100)
  })

  it('naturals.take(10000) should complete quickly', () => {
    const start = Date.now()
    const result = [...naturals().take(10000)]
    expect(result.length).toBe(10000)
    expect(Date.now() - start).toBeLessThan(50)
  })
})
