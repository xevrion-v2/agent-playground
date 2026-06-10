import { render, screen } from '@testing-library/react';
import { Button } from './Button';
import '@testing-library/jest-dom';

describe('Button', () => {
  it('displays the correct label', () => {
    const label = 'Click me';
    render(<Button label={label} />);
    
    const button = screen.getByRole('button', { name: label });
    expect(button).toBeInTheDocument();
  });

  it('is disabled when disabled prop is true', () => {
    const label = 'Disabled Button';
    render(<Button label={label} disabled={true} />);
    
    const button = screen.getByRole('button', { name: label });
    expect(button).toBeDisabled();
  });

  it('is enabled when disabled prop is false', () => {
    const label = 'Enabled Button';
    render(<Button label={label} disabled={false} />);
    
    const button = screen.getByRole('button', { name: label });
    expect(button).toBeEnabled();
  });

  it('is enabled by default when disabled prop is not provided', () => {
    const label = 'Default Button';
    render(<Button label={label} />);
    const button = screen.getByRole('button', { name: label });
    expect(button).toBeEnabled();
  });
});