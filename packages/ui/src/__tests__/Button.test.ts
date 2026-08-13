import { describe, it, expect } from 'vitest';
import { Button } from '../index';

describe('Button', () => {
  it('should return a button object with default disabled as false', () => {
    const result = Button({ label: 'Click me' });
    expect(result).toEqual({
      type: 'button',
      label: 'Click me',
      disabled: false,
    });
  });

  it('should return a button object with disabled true', () => {
    const result = Button({ label: 'Submit', disabled: true });
    expect(result).toEqual({
      type: 'button',
      label: 'Submit',
      disabled: true,
    });
  });

  it('should override disabled when explicitly set to false', () => {
    const result = Button({ label: 'Save', disabled: false });
    expect(result).toEqual({
      type: 'button',
      label: 'Save',
      disabled: false,
    });
  });
});
