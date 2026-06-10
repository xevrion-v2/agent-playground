import { render, screen, fireEvent } from '@testing-library/react';
import Button from './Button';
import React from 'react';

describe('Button', () => {
  it('renders with label text', () => {
    render(<Button label="Click me" />);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('renders in disabled state', () => {
    render(<Button label="Disabled Button" disabled />);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
  });

  it('renders with label and can be enabled', () => {
    render(<Button label="Enabled Button" />);
    const button = screen.getByRole('button');
    expect(button).not.toBeDisabled();
    expect(button).toHaveTextContent('Enabled Button');
  });

  // Add more tests as needed for the Button component
});