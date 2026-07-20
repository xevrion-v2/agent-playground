import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { Button } from './index.js';

describe('Button', () => {
  it('should return an object with the provided label', () => {
    const result = Button({ label: 'Click me' });
    assert.strictEqual(result.label, 'Click me');
  });

  it('should default disabled to false when not provided', () => {
    const result = Button({ label: 'Test' });
    assert.strictEqual(result.disabled, false);
  });

  it('should allow explicit disabled=true', () => {
    const result = Button({ label: 'Test', disabled: true });
    assert.strictEqual(result.disabled, true);
  });

  it('should allow explicit disabled=false', () => {
    const result = Button({ label: 'Test', disabled: false });
    assert.strictEqual(result.disabled, false);
  });

  it('should return type "button"', () => {
    const result = Button({ label: 'Test' });
    assert.strictEqual(result.type, 'button');
  });
});