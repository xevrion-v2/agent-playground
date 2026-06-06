import { render, screen } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  test('renders with correct label', () => {
    render(<Button label="Click me" />);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  test('is disabled when disabled prop is true', () => {
    render(<Button label="Disabled button" disabled />);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
  });

  test('is enabled when disabled prop is false', () => {
    render(<Button label="Enabled button" disabled={false} />);
    const button = screen.getByRole('button');
    expect(button).not.toBeDisabled();
  });
});