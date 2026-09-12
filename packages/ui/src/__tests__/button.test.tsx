import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from '../button';
import React from 'react';

describe('Button', () => {
  it('should render with label text', () => {
    render(<Button label="Click me" />);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('should render disabled button', () => {
    render(<Button label="Disabled Button" disabled />);
    const button = screen.getByRole('button', { name: /disabled button/i });
as
    expect(button).toBeDisabled();
  });

  it('should handle click event', async () => {
    const onClick = jest.fn();
    const user = userEvent.setup();
    render(<Button label="Click Test" onClick={onClick} />);
    
    const button = screen.getByRole('button', { name: /click test/i });
    await user.click(button);
    
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('should be enabled by default', () => {
    render(<Button label="Enabled Button" />);
    const button = screen.getByRole('button');
    expect(button).not.toBeDisabled();
  });
});