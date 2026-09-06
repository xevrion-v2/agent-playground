import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Button } from './button';

describe('Button', () => {
  it('renders the provided label', () => {
    render(<Button label="Click me" />);

    expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument();
  });

  it('applies the disabled state', () => {
    render(<Button label="Disabled" disabled />);

    expect(screen.getByRole('button', { name: 'Disabled' })).toBeDisabled();
  });
});
