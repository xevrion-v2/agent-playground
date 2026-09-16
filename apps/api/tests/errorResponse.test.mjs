import test from 'node:test';
import assert from 'node:assert';
import { sendError } from '../src/utils/errorResponse.js';

class MockResponse {
  constructor() {
    this.statusCode = 200;
    this.jsonData = null;
  }
  status(code) {
    this.statusCode = code;
    return this;
  }
  json(data) {
    this.jsonData = data;
    return this;
  }
}

test('sendError sets default 500 status and default message', () => {
  const res = new MockResponse();
  sendError(res);

  assert.strictEqual(res.statusCode, 500);
  assert.deepStrictEqual(res.jsonData, {
    error: {
      message: 'An unexpected error occurred'
    }
  });
});

test('sendError supports custom status, code, and message', () => {
  const res = new MockResponse();
  sendError(res, {
    status: 400,
    code: 'VALIDATION_ERROR',
    message: 'Email is required'
  });

  assert.strictEqual(res.statusCode, 400);
  assert.deepStrictEqual(res.jsonData, {
    error: {
      message: 'Email is required',
      code: 'VALIDATION_ERROR'
    }
  });
});

test('sendError includes details when provided', () => {
  const res = new MockResponse();
  sendError(res, {
    status: 422,
    code: 'UNPROCESSABLE_ENTITY',
    message: 'Invalid input format',
    details: { field: 'email', reason: 'malformed' }
  });

  assert.strictEqual(res.statusCode, 422);
  assert.deepStrictEqual(res.jsonData, {
    error: {
      message: 'Invalid input format',
      code: 'UNPROCESSABLE_ENTITY',
      details: { field: 'email', reason: 'malformed' }
    }
  });
});
