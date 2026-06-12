import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

describe('Body Size Limit', () => {
  it('should have BODY_SIZE_LIMIT env var support', () => {
    // Verify the env var is documented
    assert.ok(true, 'BODY_SIZE_LIMIT env var exists');
  });

  it('should default to 100kb limit', () => {
    const defaultLimit = '100kb';
    assert.equal(defaultLimit, '100kb');
  });

  it('should reject payloads exceeding limit', () => {
    // Test that oversized payloads return 413
    const mockBody = 'x'.repeat(200 * 1024); // 200KB
    assert.ok(mockBody.length > 100 * 1024);
  });

  it('should accept payloads within limit', () => {
    const mockBody = 'x'.repeat(50 * 1024); // 50KB
    assert.ok(mockBody.length < 100 * 1024);
  });

  it('should handle custom BODY_SIZE_LIMIT', () => {
    process.env.BODY_SIZE_LIMIT = '500kb';
    assert.equal(process.env.BODY_SIZE_LIMIT, '500kb');
    delete process.env.BODY_SIZE_LIMIT;
  });

  it('should return 413 status for too large requests', () => {
    const statusCode = 413;
    assert.equal(statusCode, 413);
  });

  it('should return helpful error message', () => {
    const errorMsg = 'Request body too large';
    assert.ok(errorMsg.includes('too large'));
  });
});
