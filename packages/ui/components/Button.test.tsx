import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from './Button';

describe('Button', () => {
  it('should render with correct label', () => {
    render(<Button label="Click me" />);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('should render with correct label from children', () => {
    render(<Button>Child label</Button>);
    expect(screen.getByText('Child label')).toBeInTheDocument();
  });

  it('should be disabled when disabled prop is true', () => {
    render(<Button label="Disabled button" disabled />);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
  });

  it('should not be disabled when disabled prop is false', () => {
    render(<Button label="Enabled button" disabled={false} />);
    const button = screen.getByRole('button');
    expect(button).not.toBeDisabled();
  });

  it('should handle click events', async () => {
    const user = userEvent.setup();
    const onClick = jest.fn();
    render(<Button label="Clickable" onClick={onClick} />);
    await user.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalled();
  });
});