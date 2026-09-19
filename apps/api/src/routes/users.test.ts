import { describe, it, expect } from 'vitest';
import express from 'express';
import request from 'supertest';
import usersRouter from '../src/routes/users';

const app = express();
app.use(express.json());
app.use('/users', usersRouter);

describe('Users API Routes', () => {
  describe('GET /users', () => {
    it('should return empty data array with stub message', async () => {
      const response = await request(app).get('/users');
      
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('data');
      expect(response.body.data).toEqual([]);
      expect(response.body).toHaveProperty('message');
    });
  });

  describe('POST /users', () => {
    it('should return 400 when email is missing', async () => {
      const response = await request(app)
        .post('/users')
        .send({ name: 'Test User' });
      
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
      expect(response.body).toHaveProperty('message');
    });

    it('should return 422 for invalid email format', async () => {
      const response = await request(app)
        .post('/users')
        .send({ email: 'invalid-email' });
      
      expect(response.status).toBe(422);
      expect(response.body).toHaveProperty('error');
      expect(response.body.message).toContain('Invalid email');
    });

    it('should return 422 when name is not a string', async () => {
      const response = await request(app)
        .post('/users')
        .send({ email: 'test@example.com', name: 123 });
      
      expect(response.status).toBe(422);
      expect(response.body).toHaveProperty('error');
    });

    it('should create user with valid email', async () => {
      const response = await request(app)
        .post('/users')
        .send({ email: 'test@example.com' });
      
      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('data');
      expect(response.body.data.email).toBe('test@example.com');
    });

    it('should create user with email and name', async () => {
      const response = await request(app)
        .post('/users')
        .send({ email: 'test@example.com', name: 'Test User' });
      
      expect(response.status).toBe(201);
      expect(response.body.data.name).toBe('Test User');
    });
  });
});
