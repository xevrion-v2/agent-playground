import { render, screen } from '@testing-library/react';
import { Button } from './Button';
import '@testing/@jest';
import React from 'react';

describe('Button', () => {
  test('renders with label text', () => {
    // Test that the button displays the correct label
    render(<Button label="Click me" />);
    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByText('Click me')).toBeDefined();
  });

  test('is disabled when disabled prop is true', () => {
    render(<Button label="Disabled Button" disabled={true} />);
    const disabledButton = screen.getByRole('button');
    expect(disabledButton).toBeDisabled();
  });

  test('is enabled when disabled prop is false', () => {
    const { container } = render(<Button label="Enabled Button" disabled={false} />);
    const button = container.querySelector('button');
    expect(button).not.toBeDisabled();
  });
});