import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  it('renders with the correct label', () => {
    render(<Button label="Click me" />);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('is disabled when disabled prop is true', () => {
    render(<Button label="Disabled" disabled />);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('is not disabled when disabled prop is false', () => {
    render(<Button label="Enabled" disabled={false} />);
    expect(screen.getByRole('button')).not.toBeDisabled();
  });

  it('is not disabled when disabled prop is not provided', () => {
    render(<Button label="Default" />);
    expect(screen.getByRole('button')).not.toBeDisabled();
  });
});