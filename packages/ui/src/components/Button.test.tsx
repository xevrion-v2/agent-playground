import { render, screen } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  it('should render with label text', () => {
    render(<Button label="Click me" />);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('should render as disabled when disabled prop is true', () => {
    render(<Button label="Disabled Button" disabled={true} />);
    const button = screen.getByRole('button', { name: /disabled button/i });
    expect(button).toBeDisabled();
  });

  it('should not be disabled when disabled prop is false', () => {
    render(<Button label="Enabled Button" disabled={false} />);
    const button = screen.getByRole('button', { name: /enabled button/i });
    expect(button).not.toBeDisabled();
  });

  it('should toggle disabled state correctly', () => {
    const { rerender } = render(<Button label="Test Button" disabled={false} />);
    const button = screen.getByRole('button', { name: /test button/i });
    expect(button).not.toBeDisabled();

    // Re-render with disabled state
    rerender(<Button label="Test Button" disabled={true} />);
    const updatedButton = screen.getByRole('button', { name: /test button/i });
    expect(updatedButton).toBeDisabled();
  });

  it('should display correct label', () => {
    render(<Button label="Submit" />);
    expect(screen.getByText('Submit')).toBeInTheDocument();
  });
});