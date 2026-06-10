import { render, screen } from '@testing-library/react';
import { Button } from '../components/Button';

describe('Button', () => {
  test('renders with correct label', () => {
    render(<Button label="Click me" />);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  test('renders with correct label and disabled state', () => {
    render(<Button label="Disabled Button" disabled />);
    const button = screen.getByText('Disabled Button');
    expect(button).toBeInTheDocument();
    expect(button).toBeDisabled();
  });

  test('renders enabled button by default', () => {
    render(<Button label="Enabled Button" />);
    const button = screen.getByText('Enabled Button');
    expect(button).toBeInTheDocument();
    expect(button).not.toBeDisabled();
  });
});