import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from '../Button';
import { vi, describe, it, expect, beforeEach } from 'vitest';

describe('Button', () => {
  const onClick = vi.fn();

  beforeEach(() => {
    onClick.mockClear();
  });

  it('should render with label text', () => {
    render(<Button label="Click me" onClick={onClick} />);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('should be disabled when disabled prop is true', () => {
    render(<Button label="Disabled Button" disabled onClick={onClick} />);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
  });

  it('should not be disabled when disabled prop is false or undefined', () => {
    render(<Button label="Enabled Button" onClick={onClick} />);
    const button = screen.getByRole('button');
    expect(button).not.toBeDisabled();
  });

  it('should call onClick when clicked and not disabled', async () => {
    const user = userEvent.setup();
    render(<Button label="Clickable" onClick={onClick} />);
    const button = screen.getByRole('button');
    await user.click(button);
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});