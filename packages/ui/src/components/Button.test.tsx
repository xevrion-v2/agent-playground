import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from './Button';
import { vi, describe, it, expect } from 'vitest';

describe('Button', () => {
  it('should render with label text', () => {
    render(<Button label="Click me" />);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('should be disabled when disabled prop is true', () => {
    render(<Button label="Disabled Button" disabled={true} />);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
  });

  it('should not be disabled when disabled prop is false', () => {
    render(<Button label="Enabled Button" disabled={false} />);
    const button = screen.getByRole('button');
    expect(button).not.toBeDisabled();
  });

  it('should call onClick when clicked and not disabled', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<Button label="Clickable" onClick={onClick} />);
    
    const button = screen.getByRole('button');
    await user.click(button);
    
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('should not call onClick when disabled', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<Button label="Disabled" onClick={onClick} disabled={true} />);
    const button = screen.getByRole('button');
    await user.click(button);
    expect(onClick).not.toHaveBeenCalled();
  });
});