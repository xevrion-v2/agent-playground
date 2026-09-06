import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Button from './Button';

describe('Button Component', () => {
  test('renders button with correct text', () => {
    render(<Button text="Click me" />);
    expect(screen.getByRole('button')).toHaveTextContent('Click me');
  });

  test('calls onClick handler when clicked', () => {
    const handleClick = jest.fn();
    render(<Button text="Click me" onClick={handleClick} />);
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('disables button when disabled prop is true', () => {
    render(<Button text="Disabled" disabled={true} />);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  test('has correct accessibility attributes', () => {
    render(<Button text="Accessible" />);
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-label', 'Accessible');
  });

  test('re-renders with updated props', () => {
    const { rerender } = render(<Button text="Old" />);
    rerender(<Button text="New" />);
    expect(screen.getByRole('button')).toHaveTextContent('New');
  });
});