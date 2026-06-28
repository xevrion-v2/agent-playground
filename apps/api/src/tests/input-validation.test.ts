import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  isValidEmail,
  isValidUsername,
  validateUser,
} from '../routes/users.ts';

describe('Input Validation', () => {
  describe('Email Validation', () => {
    it('should accept valid email formats', () => {
      const validEmails = [
        'user@example.com',
        'test.user@domain.org',
        'user+tag@example.co.uk',
      ];
      for (const email of validEmails) {
        assert.ok(isValidEmail(email), `Should accept: ${email}`);
      }
    });

    it('should reject invalid email formats', () => {
      const invalidEmails = [
        '',
        'notanemail',
        '@domain.com',
        'user@',
        'user@.com',
        'user@domain.',
      ];
      for (const email of invalidEmails) {
        assert.ok(!isValidEmail(email), `Should reject: ${email}`);
      }
    });
  });

  describe('Username Validation', () => {
    it('should accept valid usernames', () => {
      const validUsernames = ['user123', 'test_user', 'my-name', 'abc'];
      for (const username of validUsernames) {
        assert.ok(isValidUsername(username), `Should accept: ${username}`);
      }
    });

    it('should reject usernames that are too short', () => {
      assert.ok(!isValidUsername('ab'));
    });

    it('should reject usernames that are too long', () => {
      assert.ok(!isValidUsername('a'.repeat(31)));
    });

    it('should reject usernames with invalid characters', () => {
      const invalidUsernames = ['user@name', 'user name', 'user.name', 'user!'];
      for (const username of invalidUsernames) {
        assert.ok(!isValidUsername(username), `Should reject: ${username}`);
      }
    });
  });

  describe('Validation Response', () => {
    it('returns normalized values for valid input', () => {
      const result = validateUser({ email: '  test@example.com  ', username: '  valid-user  ' });
      assert.equal(result.errors.length, 0);
      assert.equal(result.normalized.email, 'test@example.com');
      assert.equal(result.normalized.username, 'valid-user');
    });

    it('returns field-specific errors for invalid input', () => {
      const result = validateUser({ email: 'bad', username: 'ab' });
      assert.ok(result.errors.some((error) => error.field === 'email'));
      assert.ok(result.errors.some((error) => error.field === 'username'));
    });

    it('treats missing fields as validation errors', () => {
      const result = validateUser({});
      assert.ok(result.errors.length >= 2);
    });
  });
});
