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
    expect(screen.getByText('Disabled')).toBeDisabled();
  });

  it('is not disabled when disabled prop is false', () => {
    render(<Button label="Enabled" disabled={false} />);
    expect(screen.getByText('Enabled')).not.toBeDisabled();
  });

  it('is not disabled when disabled prop is not provided', () => {
    render(<Button label="Default" />);
    expect(screen.getByText('Default')).not.toBeDisabled();
  });
});