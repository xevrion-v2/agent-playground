import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from './Button';

describe('Button', () => {
  it('renders with correct label', () => {
    render(<Button label="Click me" />);
    
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('renders with correct label from children prop', () => {
    render(<Button>Child Label</Button>);
    
    expect(screen.getByText('Child Label')).toBeInTheDocument();
  });

  it('applies disabled attribute when disabled prop is true', () => {
    render(<Button label="Disabled Button" disabled />);
    
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
  });

  it('does not apply disabled attribute when disabled prop is false', () => {
    render(<Button label="Enabled Button" disabled={false} />);
    
    const button = screen.getByRole('button');
    expect(button).toBeEnabled();
  });

  it('does not apply disabled attribute when disabled prop is not provided', () => {
    render(<Button label="Default Button" />);
    
    const button = screen.getByRole('button');
    expect(button).toBeEnabled();
  });
});