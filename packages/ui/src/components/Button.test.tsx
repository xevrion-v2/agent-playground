import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from './Button';

describe('Button', () => {
  it('should render with correct label text', () => {
    render(<Button label="Click me" />);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('should render with correct label from props', () => {
    render(<Button label="Submit" />);
    const button = screen.getByRole('button');
    expect(button).toHaveTextContent('Submit');
  });

  it('should be enabled by default', () => {
    render(<Button label="Test" />);
    const button = screen.getByRole('button');
    expect(button).not.toBeDisabled();
  });

  it('should be disabled when disabled prop is true', () => {
    render(<Button label="Test" disabled />);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
  });

  it('should handle click events', () => {
    const handleClick = jest.fn();
    render(<Button label="Test" onClick={handleClick} />);
    const button = screen.getByRole('button');
    button.click();
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});