
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Button from './Button';

describe('Button component', () => {
  it('renders with the correct label', () => {
    const label = 'Click Me';
    render(<Button label={label} />);
    expect(screen.getByText(label)).toBeInTheDocument();
  });

  it('displays disabled state correctly', () => {
    const label = 'Disabled Button';
    render(<Button label={label} disabled />);
    expect(screen.getByText(label)).toBeDisabled();
  });
});
```