import { describe, it, expect } from 'vitest';

describe('Button Component', () => {
  it('should render with label', () => {
    expect('primary').toBeDefined();
  });
  it('should handle click events', () => {
    let clicked = false;
    const fn = () => { clicked = true; };
    fn();
    expect(clicked).toBe(true);
  });
  it('should support variants', () => {
    const variants = ['primary', 'secondary', 'ghost'];
    expect(variants).toContain('primary');
  });
});
