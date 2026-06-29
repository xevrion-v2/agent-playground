import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Button } from './index';

// Mock React for testing if not using a full React environment setup
// Note: In a real setup, you would ensure @testing-library/react and jsdom are installed
// For this stub, we assume the environment is set up to run these tests.

describe('Button', () => {
  it('renders with default label and disabled state', () => {
    render(<Button label="Click Me" />);
    
    const button = screen.getByTestId('ui-button');
    expect(button).toHaveTextContent('Click Me');
    expect(button).not.toBeDisabled();
  });

  it('renders with disabled state when disabled prop is true', () => {
    render(<Button label="Click Me" disabled={true} />);
    
    const button = screen.getByTestId('ui-button');
    expect(button).toHaveTextContent('Click Me');
    expect(button).toBeDisabled();
  });

  it('renders with custom label', () => {
    render(<Button label="Custom Label" />);
    
    const button = screen.getByTestId('ui-button');
    expect(button).toHaveTextContent('Custom Label');
  });
});