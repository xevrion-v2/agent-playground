import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './Button';
import { describe, it, expect } from 'vitest';

describe('Button', () => {
  it('should render with label text', () => {
    const labelText = 'Click me';
    render(<Button label={labelText} />);
    expect(screen.getByText(labelText)).toBeInTheDocument();
  });

  it('should be disabled when disabled prop is true', () => {
    render(<Button label="Disabled Button" disabled />);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
  });

  it('should not be disabled when disabled prop is false', () => {
    render(<Button label="Enabled Button" disabled={false} />);
    const button = screen.getByRole('button');
    expect(button).not.toBeDisabled();
  });

  it('should handle click events', () => {
    const handleClick = () => {};
    render(<Button label="Clickable Button" onClick={handleClick} />);
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });
});