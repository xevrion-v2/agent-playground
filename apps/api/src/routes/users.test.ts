import express from 'express';
import request from 'supertest';
import { describe, expect, it } from 'vitest';
import usersRouter from './users';

describe('users routes', () => {
  const app = express();
  app.use(express.json());
  app.use('/users', usersRouter);

  it('lists users', async () => {
    const response = await request(app).get('/users');

    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });

  it('creates a user', async () => {
    const payload = { name: 'Ada Lovelace', email: 'ada@example.com' };

    const response = await request(app).post('/users').send(payload);

    expect(response.status).toBe(201);
    expect(response.body).toEqual(payload);
  });
});