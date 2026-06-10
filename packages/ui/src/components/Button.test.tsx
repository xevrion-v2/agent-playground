import { render, screen } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  it('should render with correct label', () => {
    const { getByText } = render(<Button label="Click Me" />);
    expect(getByText('Click Me')).toBeInTheDocument();
  });

  it('should render with label text', () => {
    const { getByText } = render(<Button label="Test Button">Test Button</Button>);
    expect(getByText('Test Button')).toBeInTheDocument();
  });

  it('should be disabled when disabled prop is true', () => {
    const { container } = render(<Button label="Disabled Button" disabled />);
    const button = container.querySelector('button');
    expect(button).toBeDisabled();
  });
});