import { describe, it, expect } from 'vitest';

interface ButtonProps {
  label: string;
  disabled?: boolean;
  onClick?: () => void;
}

function createButton(props: ButtonProps): { label: string; disabled: boolean; click: () => void } {
  return {
    label: props.label,
    disabled: props.disabled ?? false,
    click: () => props.onClick?.(),
  };
}

describe('Button Stub', () => {
  it('renders with the correct label', () => {
    const btn = createButton({ label: 'Submit' });
    expect(btn.label).toBe('Submit');
  });

  it('is enabled by default', () => {
    const btn = createButton({ label: 'Click Me' });
    expect(btn.disabled).toBe(false);
  });

  it('is disabled when disabled prop is true', () => {
    const btn = createButton({ label: 'Disabled', disabled: true });
    expect(btn.disabled).toBe(true);
  });

  it('calls onClick handler when clicked', () => {
    let clicked = false;
    const btn = createButton({ label: 'Test', onClick: () => { clicked = true; } });
    btn.click();
    expect(clicked).toBe(true);
  });

  it('does not throw when onClick is undefined', () => {
    const btn = createButton({ label: 'No Handler' });
    expect(() => btn.click()).not.toThrow();
  });

  it('handles empty label', () => {
    const btn = createButton({ label: '' });
    expect(btn.label).toBe('');
  });
});
