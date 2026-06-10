import { render, screen } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  it('renders with correct label', () => {
    render(<Button label="Click me" />);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('renders with correct label when provided', () => {
    render(<Button label="Submit" />);
    expect(screen.getByText('Submit')).toBeInTheDocument();
  });

  it('applies disabled attribute when disabled prop is true', () => {
    render(<Button label="Disabled Button" disabled />);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
  });

  it('does not apply disabled attribute when disabled prop is false', () => {
    render(<Button label="Enabled Button" disabled={false} />);
    const button = screen.getByRole('button');
    expect(button).not.toBeDisabled();
  });
});