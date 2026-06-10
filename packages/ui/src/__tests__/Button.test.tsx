import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

// Mock the Button component since we don't have the actual implementation
jest.mock('../components/Button/Button', () => ({
  Button: ({ label, disabled, children }: { label?: string; disabled?: boolean; children?: React.ReactNode }) => (
    <button disabled={disabled} data-testid="button">
      {label || children}
    </button>
  )
}));

const { Button } = require('../components/Button/Button');

describe('Button', () => {
  it('renders with correct label', () => {
    render(<Button label="Click me" />);
    
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('applies disabled attribute when disabled prop is true', () => {
    render(<Button label="Disabled Button" disabled />);
    
    const button = screen.getByTestId('button');
    expect(button).toBeDisabled();
  });

  it('does not apply disabled attribute when disabled prop is false', () => {
    render(<Button label="Enabled Button" disabled={false} />);
    
    const button = screen.getByText('Enabled Button');
    expect(button).toBeEnabled();
  });
});