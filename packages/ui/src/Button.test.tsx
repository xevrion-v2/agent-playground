import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  it('renders with the correct label', () => {
    render(<Button label="Click me" />);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('renders with disabled attribute when disabled is true', () => {
    render(<Button label="Disabled" disabled />);
    const button = screen.getByText('Disabled');
    expect(button).toBeDisabled();
  });

  it('does not have disabled attribute when disabled is false', () => {
    render(<Button label="Enabled" disabled={false} />);
    const button = screen.getByText('Enabled');
    expect(button).not.toBeDisabled();
  });
});