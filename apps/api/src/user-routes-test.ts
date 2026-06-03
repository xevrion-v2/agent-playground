import request from 'supertest';
import app from '../apps/api/src/index';

describe('User Routes', () => {
  test('GET /users returns user list', async () => {
    const res = await request(app).get('/users');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('POST /users creates user', async () => {
    const res = await request(app)
      .post('/users')
      .send({ name: 'Test User', email: 'test@example.com' });
    expect(res.status).toBe(201);
  });

  test('POST /users validates input', async () => {
    const res = await request(app)
      .post('/users')
      .send({});
    expect(res.status).toBe(400);
  });
});
