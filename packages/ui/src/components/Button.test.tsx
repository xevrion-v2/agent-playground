import { render, screen } from '@testing-library/react';
import { Button } from './Button';
import '@testing-library/jest-dom';

describe('Button', () => {
  it('renders with correct label', () => {
    render(<Button label="Click Me" onClick={jest.fn()} />);
    expect(screen.getByText('Click Me')).toBeInTheDocument();
  });

  it('renders with correct label text', () => {
    render(<Button label="Submit" onClick={jest.fn()} />);
    expect(screen.getByText('Submit')).toBeInTheDocument();
  });

  it('is disabled when disabled prop is true', () => {
    render(<Button label="Disabled Button" disabled onClick={jest.fn()} />);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
  });

  it('is enabled when disabled prop is false', () => {
    render(<Button label="Enabled Button" disabled={false} onClick={jest.fn()} />);
    const button = screen.getByRole('button');
    expect(button).not.toBeDisabled();
  });

  it('displays correct label text', () => {
    render(<Button label="Test Button" onClick={jest.fn()} />);
    const button = screen.getByRole('button');
    expect(button).toHaveTextContent('Test Button');
  });
});
