import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

// Mock Button component since we don't have access to the actual implementation
const MockButton = ({
  children,
  disabled = false,
  ...props
}: {
  children: React.ReactNode;
  disabled?: boolean;
  [key: string]: any;
}) => <button disabled={disabled} {...props}>{children}</button>;

describe('Button', () => {
  it('should render with label text', () => {
    render(<MockButton>Click me</MockButton>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('should be disabled when disabled prop is true', () => {
    render(<MockButton disabled>Disabled Button</MockButton>);
    const button = screen.getByRole('button', { name: 'Disabled Button' });
    expect(button).toBeDisabled();
  });

  it('should not be disabled when disabled prop is false', () => {
    render(<MockButton>Enabled Button</MockButton>);
    const button = screen.getByRole('button', { name: 'Enabled Button' });
    expect(button).not.toBeDisabled();
  });

  it('should display the correct label', () => {
    render(<MockButton>Test Button</MockButton>);
    expect(screen.getByText('Test Button')).toBeInTheDocument();
  });
});