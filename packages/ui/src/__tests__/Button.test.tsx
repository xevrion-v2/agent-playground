import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Button } from '../Button';

describe('Button', () => {
  it('renders with the correct label', () => {
    render(<Button label="Click me" />);
    const button = screen.getByRole('button', { name: /click me/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('Click me');
  });

  it('renders with a different label', () => {
    render(<Button label="Submit" />);
    const button = screen.getByRole('button', { name: /submit/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('Submit');
  });

  it('applies the disabled attribute when disabled prop is true', () => {
    render(<Button label="Disabled" disabled />);
    const button = screen.getByRole('button', { name: /disabled/i });
    expect(button).toBeDisabled();
  });

  it('does not have disabled attribute when disabled prop is false', () => {
    render(<Button label="Enabled" disabled={false} />);
    const button = screen.getByRole('button', { name: /enabled/i });
    expect(button).not.toBeDisabled();
  });

  it('is enabled by default when disabled prop is not provided', () => {
    render(<Button label="Default" />);
    const button = screen.getByRole('button', { name: /default/i });
    expect(button).not.toBeDisabled();
  });

  it('renders label and disabled state together correctly', () => {
    render(<Button label="Save" disabled />);
    const button = screen.getByRole('button', { name: /save/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('Save');
    expect(button).toBeDisabled();
  });
});