import { describe, it, expect } from 'vitest';
import { Button } from './index';

describe('Button', () => {
  it('should render with label', () => {
    const button = Button({ label: 'Click me' });
    expect(button.label).toBe('Click me');
    expect(button.type).toBe('button');
    expect(button.disabled).toBe(false);
  });

  it('should render with disabled state', () => {
    const button = Button({ label: 'Disabled', disabled: true });
    expect(button.label).toBe('Disabled');
    expect(button.disabled).toBe(true);
  });

  it('should default disabled to false', () => {
    const button = Button({ label: 'Test' });
    expect(button.disabled).toBe(false);
  });

  it('should handle empty label', () => {
    const button = Button({ label: '' });
    expect(button.label).toBe('');
  });

  it('should handle long label', () => {
    const longLabel = 'A'.repeat(1000);
    const button = Button({ label: longLabel });
    expect(button.label).toBe(longLabel);
  });
});
