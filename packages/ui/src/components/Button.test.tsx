import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  it('renders with the correct label', () => {
    render(<Button label="Click me" />);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('renders as disabled when disabled prop is true', () => {
    render(<Button label="Disabled" disabled />);
    const button = screen.getByRole('button', { name: 'Disabled' });
    expect(button).toBeDisabled();
  });

  it('renders as enabled when disabled prop is false', () => {
    render(<Button label="Enabled" disabled={false} />);
    const button = screen.getByRole('button', { name: 'Enabled' });
    expect(button).toBeEnabled();
  });

  it('renders as enabled by default', () => {
    render(<Button label="Default" />);
    const button = screen.getByRole('button', { name: 'Default' });
    expect(button).toBeEnabled();
  });
});