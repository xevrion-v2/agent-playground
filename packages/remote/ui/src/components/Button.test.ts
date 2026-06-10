import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from './Button';

describe('Button', () => {
  it('should render with label text', () => {
    const handleClick = jest.fn();
    render(<Button label="Click me" onClick={handleClick} />);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('should be disabled when disabled prop is true', () => {
    const handleClick = jest.fn();
    render(<Button label="Disabled Button" disabled onClick={handleClick} />);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
  });
});