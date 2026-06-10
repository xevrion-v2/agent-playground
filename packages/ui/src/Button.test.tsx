import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from './Button';

describe('Button', () => {
  it('renders with the correct label', () => {
    render(<Button label="Click me" />);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('renders with the correct label when label changes', () => {
    const { rerender } = render(<Button label="Initial" />);
    expect(screen.getByText('Initial')).toBeInTheDocument();
    
    rerender(<Button label="Updated" />);
    expect(screen.getByText('Updated')).toBeInTheDocument();
  });

  it('is enabled by default', () => {
    render(<Button label="Click me" />);
    const button = screen.getByRole('button');
    expect(button).toBeEnabled();
  });

  it('is disabled when disabled prop is true', () => {
    render(<Button label="Click me" disabled />);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
  });
});