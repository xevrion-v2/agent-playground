import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from '../components/Button'; // Adjusted path based on typical component structure

describe('Button', () => {
  test('renders with correct label', () => {
    const buttonText = 'Click me';
    render(<Button label={buttonText} />);
    
    expect(screen.getByText(buttonText)).toBeInTheDocument();
  });

  test('is disabled when disabled prop is true', () => {
    const { container } = render(<Button disabled />);
    const button = container.querySelector('button');
    expect(button).toBeDisabled();
  });

  test('renders enabled button by default', () => {
    const { container } = render(<Button />);
    expect(container.querySelector('button')).not.toBeDisabled();
  });
});