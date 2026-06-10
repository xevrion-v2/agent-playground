import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from '../Button';

describe('Button', () => {
  it('should render with the correct label', () => {
    render(<Button label="Click me" />);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('should be enabled by default', () => {
    render(<Button label="Click me" />);
    const button = screen.getByRole('button', { name: /click me/i });
    expect(button).not.toBeDisabled();
  });

  it('should be disabled when disabled prop is true', () => {
    render(<Button label="Click me" disabled />);
    const button = screen.getByRole('button', { name: /click me/i });
    expect(button).toBeDisabled();
  });

  it('should call onClick when clicked and not disabled', async () => {
    const handleClick = jest.fn();
    render(<Button label="Click me" onClick={handleClick} />);
    const button = screen.getByRole('button', { name: /click me/i });
    await userEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});