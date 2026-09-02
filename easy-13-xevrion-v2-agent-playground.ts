import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Button from './Button';

describe('Button', () => {
  it('renders with default props', () => {
    render(<Button label="Click me" />);
    const buttonElement = screen.getByRole('button', { name: 'Click me' });
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveTextContent('Click me');
  });

  it('calls onClick handler when clicked', () => {
    const handleClick = jest.fn();
    render(<Button label="Submit" onClick={handleClick} />);
    const buttonElement = screen.getByRole('button', { name: 'Submit' });
    fireEvent.click(buttonElement);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('disables the button when disabled prop is true', () => {
    render(<Button label="Disabled" disabled />);
    const buttonElement = screen.getByRole('button', { name: 'Disabled' });
    expect(buttonElement).toBeDisabled();
  });

  it('applies custom className when provided', () => {
    render(<Button label="Styled" className="custom-button" />);
    const buttonElement = screen.getByRole('button', { name: 'Styled' });
    expect(buttonElement).toHaveClass('custom-button');
  });

  it('renders with primary variant by default', () => {
    render(<Button label="Primary" variant="primary" />);
    const buttonElement = screen.getByRole('button', { name: 'Primary' });
    expect(buttonElement).toHaveClass('btn-primary');
  });

  it('renders with secondary variant', () => {
    render(<Button label="Secondary" variant="secondary" />);
    const buttonElement = screen.getByRole('button', { name: 'Secondary' });
    expect(buttonElement).toHaveClass('btn-secondary');
  });
});