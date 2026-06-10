import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from './Button';

describe('Button', () => {
  test('renders with correct label', () => {
    render(<Button label="Click me" />);
    
    const button = screen.getByRole('button', { name: /click me/i });
    expect(button).toBeInTheDocument();
  });

  test('displays the correct label text', () => {
    render(<Button label="Test Button" />);
    
    expect(screen.getByText('Test Button')).toBeInTheDocument();
  });

  test('applies disabled attribute when disabled prop is true', () => {
    render(<Button label="Disabled Button" disabled={true} />);
    
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
  });

  test('does not apply disabled attribute when disabled prop is false', () => {
    render(<Button label="Enabled Button" disabled={false} />);
    
    const button = screen.getByRole('button');
    expect(button).not.toBeDisabled();
  });
});