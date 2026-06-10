import { render, screen } +from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Button } from '../Button';

describe('Button', () => {
  it('should render button with correct label', () => {
    const label = 'Click me';
    render(<Button label={label} />);
    expect(screen.getByText(label)).toBeInTheDocument();
  });

  it('should render disabled button when disabled prop is true', () => {
    render(<Button label="Disabled Button" disabled={true} />);
    const button = screen.getByRole('button', { disabled: true });
    expect(button).toBeDisabled();
  });

  it('should not be disabled when disabled prop is false', () => {
    const label = 'Enabled Button';
    render(<Button label={label} />);
    const buttonElement = screen.getByText(label);
    expect(buttonElement).not.toBeDisabled();
  });

  it('should render button with correct text', () => {
    render(<Button label="Test Button" />);
    expect(screen.getByText('Test Button')).toBeInTheDocument();
  });
});