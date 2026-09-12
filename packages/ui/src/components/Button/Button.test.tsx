import { render, screen } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  it('renders with correct label', () => {
    render(<Button label="Click me" />);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('renders as disabled when disabled prop is true', () => {
    const { container } = render(<Button label="Click me" disabled />);
    expect(screen.getByText('Click me')).toBeDisabled();
  });

  it('renders with correct label', () => {
    render(<Button label="Submit" />);
    expect(screen.getByText('Submit')).toBeInTheDocument();
  });

  it('renders with correct label and disabled state', () => {
    const { container } = render(<Button label="Submit" disabled />);
    const button = screen.getByText('Submit');
    expect(button).toBeDisabled();
  });
});