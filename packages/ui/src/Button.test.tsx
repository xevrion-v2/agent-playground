import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { Button } from './Button';

// Mock ResizeObserver since it's not available in JSDOM
global.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
};

describe('Button', () => {
  test('should render with correct label', () => {
    render(<Button label="Click me" />);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  test('should be disabled when disabled prop is true', () => {
    const { container } = render(
      <Button label="Disabled Button" disabled={true} />
    );
    const button = container.querySelector('button');
    expect(button).toBeDisabled();
  });

  test(' should render with correct label and be enabled', () => {
    render(<Button label="Submit" disabled={false} />);
    const button = screen.getByText('Submit');
    expect(button).toBeInTheDocument();
    expect(button).not.toBeDisabled();
  });

  test('should be enabled when disabled is false', () => {
    render(<Button label="Test" disabled={false} />);
    const button = screen.getByText('Test');
    expect(button).not.toBeDisabled();
  });
});