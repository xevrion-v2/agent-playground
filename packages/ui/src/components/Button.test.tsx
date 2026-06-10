import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from './Button';
import React from 'react';

describe('Button', () => {
  it('should render with label text', () => {
    const buttonText = 'Click me';
    render(<Button label={buttonText} />);
    
    const button = screen.getByRole('button', { name: buttonText });
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent(buttonText);
  });

  it('should be disabled when disabled prop is true', () => {
    render(
      <Button label="Disabled Button" disabled={true} />
    );
    
    const button = screen.getByRole('button', { name: 'Disabled Button' });
    expect(button).toBeDisabled();
  });

  it('should not be disabled when disabled prop is false', () => {
    render(
      <Button label="Enabled Button" disabled={false} />
    );
    expect(screen.getByRole('button', { name: 'Enabled Button' })).not.toBeDisabled();
  });
});