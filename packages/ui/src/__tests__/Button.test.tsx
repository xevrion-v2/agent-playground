import { render, screen } from '@testing-library/react';
import { Button } from '../Button';

describe('Button', () => {
  it('should render with correct label', () => {
    render(<Button label="Click me" />);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('should be disabled when disabled prop is true', () => {
    const { getByRole } = render(
      <Button label="Disabled Button" disabled={true} />
    );
    const button = getByRole('button');
    expect(button).toBeDisabled();
  });

  it('should not be disabled when disabled prop is false', () {
    render(
      <Button label="Test" disabled={false} />
    );
    const button = screen.getByRole('button');
    expect(button).not.toBeDisabled();
  });

  it('should render with correct label and be enabled', () {
    render(<Button label="Submit" disabled={false} />);
    expect(screen.getByText('Submit')).toBeInTheDocument();
  });