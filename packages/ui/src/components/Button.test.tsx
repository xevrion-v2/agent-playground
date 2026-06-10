import { render, screen } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  it('should render with label text', () => {
    render(<Button label="Click me" />);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('should render with disabled state', () => {
    render(<Button label="Disabled Button" disabled />);
    const button = screen.getByRole('button', { name: /disabled button/i });
    expect(button).toBeDisabled();
  });

  it('should render as enabled by default', () => {
    render(<Button label="Enabled Button" />);
    const button = screen.getByRole('button', { name: /enabled button/i });
    expect(button).not.toBeDisabled();
  });

  it('should handle disabled state change', () => {
    const { rerender } = render(<Button label="Test" disabled={false} />);
    const button = screen.getByRole('button', { name: /test/i });
    expect(button).not.toBeDisabled();
    rerender(<Button label="Test" disabled={true} />);
    expect(button).toBeDisabled();
  });
});