import React from 'react';
import { render, screen } from '@testing-library/react';
import { Button } from './Button'; // assuming this is the correct import

describe('Button', () => {
  test('renders with label text', () => {
    render(<Button label="Click me" />);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  test('renders with disabled attribute when disabled is true', () => {
    render(<Button label="Disabled Button" disabled />);
    const button = screen.getByRole('button', { name: 'Disabled Button' });
    expect(button).toBeDisabled();
  });

  test('does not render with disabled attribute when disabled is false', () => {
    render(<Button label="Enabled Button" disabled={false} />);
    const button = screen.getByRole('button', { name: 'Enabled Button' });
    expect(button).not.toBeDisabled();
  });

  test('applies correct label text', () => {
    render(<Button label="Test Button" />);
    expect(screen.getByText('Test Button')).toBeInTheDocument();
  });

  test('handles disabled state correctly', () => {
    render(<Button label="Test Button" disabled />);
    const button = screen.getByText('Test Button');
    expect(button).toBeDisabled();
  });

  test('enabled button is not disabled', () => {
    render(<Button label="Test Button" disabled={false} />);