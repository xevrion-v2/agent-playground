import { render, screen } from '@testing-library/react';
import Button from './Button';

describe('Button', () => {
  test('renders with label text', () => {
    render(<Button label="Click me" />);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  test('renders with disabled attribute', () => {
    render(<Button label="Disabled Button" disabled />);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
  });

  test('is disabled when disabled prop is true', () => {
    render(<Button label="Submit" disabled={true} />);
    const buttonElement = screen.getByText('Submit');
    expect(buttonElement).toBeDisabled();
  });

  test('displays correct label', () => {
    render(<Button label="Test Button" />);
    expect(screen.getByText('Test Button')).toBeInTheDocument();
  });
});