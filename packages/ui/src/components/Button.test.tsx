import { render, screen } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  it('should render with label text', () => {
    render(<Button label="Click me" />);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('should render with disabled state', () => {
    render(<Button label="Disabled Button" disabled />);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
  });

  it('should render with enabled state by default', () => {
    render(<Button label="Enabled Button" />);
    const button = screen.getByRole('button');
    expect(button).not.toBeDisabled();
  });

  it('should render with custom disabled state', () => {
    render(<Button label="Custom Button" disabled={true} />);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
  });

  it('should render with custom enabled state', () => {
    render(<Button label="Custom Button" disabled={false} />);
  });
});