import { guardPromise, guardSync } from '../promise.guard';

describe('guardPromise', () => {
  test('returns [null, result] on success', async () => {
    const [err, result] = await guardPromise(Promise.resolve('success'));
    expect(err).toBe(null);
    expect(result).toBe('success');
  });
  test('returns [error, null] on failure', async () => {
    const [err, result] = await guardPromise(Promise.reject('fail'));
    expect(err).toBeInstanceOf(Error);
    expect(result).toBe(null);
  });
});

describe('guardSync', () => {
  test('returns [null, result] on success', () => {
    const [err, result] = guardSync(() => 'success');
    expect(err).toBe(null);
    expect(result).toBe('success');
  });
});
