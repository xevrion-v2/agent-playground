import { describe, it, expect } from 'vitest';
import { Button, ButtonProps } from '../src/index';

describe('Button Component', () => {
  describe('label behavior', () => {
    it('should render with the provided label', () => {
      const result = Button({ label: 'Click me' });
      expect(result.label).toBe('Click me');
    });

    it('should handle empty string label', () => {
      const result = Button({ label: '' });
      expect(result.label).toBe('');
    });
  });

  describe('disabled behavior', () => {
    it('should default to disabled: false when not provided', () => {
      const result = Button({ label: 'Test' });
      expect(result.disabled).toBe(false);
    });

    it('should respect disabled: true when provided', () => {
      const result = Button({ label: 'Test', disabled: true });
      expect(result.disabled).toBe(true);
    });

    it('should respect disabled: false when explicitly set', () => {
      const result = Button({ label: 'Test', disabled: false });
      expect(result.disabled).toBe(false);
    });
  });

  describe('return shape', () => {
    it('should return type "button"', () => {
      const result = Button({ label: 'Test' });
      expect(result.type).toBe('button');
    });

    it('should return an object with all expected properties', () => {
      const props: ButtonProps = { label: 'Submit', disabled: true };
      const result = Button(props);
      
      expect(result).toHaveProperty('type');
      expect(result).toHaveProperty('label');
      expect(result).toHaveProperty('disabled');
    });
  });
});
