import request from 'supertest';
import app from './index';

describe('API 404 Handler', () => {
  it('should return JSON 404 for unknown routes', async () => {
    const res = await request(app).get('/unknown-route');
    
    expect(res.status).toBe(404);
    expect(res.headers['content-type']).toMatch(/application\/json/);
    expect(res.body).toEqual({
      error: 'Not Found',
      message: 'Cannot GET /unknown-route',
    });
  });

  it('should return JSON 404 for unknown POST routes', async () => {
    const res = await request(app).post('/api/missing');
    
    expect(res.status).toBe(404);
    expect(res.headers['content-type']).toMatch(/application\/json/);
    expect(res.body).toEqual({
      error: 'Not Found',
      message: 'Cannot POST /api/missing',
    });
  });

  it('should still return 200 for /health', async () => {
    const res = await request(app).get('/health');
    
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ status: 'ok' });
  });

  it('should still return 200 for /users (empty list)', async () => {
    const res = await request(app).get('/users');
    
    expect(res.status).toBe(200);
    // Assuming users route returns an array or object, we just check status and JSON type
    expect(res.headers['content-type']).toMatch(/application\/json/);
  });
});