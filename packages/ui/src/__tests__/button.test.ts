import { describe, it, expect } from 'vitest'
import { Button } from '../index'

describe('Button', () => {
  it('should return an object with type "button"', () => {
    const result = Button({ label: 'Click me' })
    expect(result.type).toBe('button')
  })

  it('should use the provided label', () => {
    const result = Button({ label: 'Submit' })
    expect(result.label).toBe('Submit')
  })

  it('should default disabled to false', () => {
    const result = Button({ label: 'Click me' })
    expect(result.disabled).toBe(false)
  })

  it('should accept disabled as true', () => {
    const result = Button({ label: 'Click me', disabled: true })
    expect(result.disabled).toBe(true)
  })

  it('should handle empty label', () => {
    const result = Button({ label: '' })
    expect(result.label).toBe('')
  })

  it('should handle special characters in label', () => {
    const result = Button({ label: '🚀 Launch' })
    expect(result.label).toBe('🚀 Launch')
  })
})
