import request from 'supertest';
import app from '../app';

describe('GET /health', () => {
  it('returns a healthy response', async () => {
    const res = await request(app).get('/health');
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('success');
    expect(res.body.data).toEqual({ healthy: true });
  });
});