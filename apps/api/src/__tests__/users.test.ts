import request from 'supertest';
import app from '../app';
import { describe, it, expect } from 'vitest';

describe('User API', () => {
  describe('GET /api/users', () => {
    it('should return a list of users', async () => {
      const response = await request(app)
        .get('/api/users')
        .expect(200);
      
      expect(response.body).toBeDefined();
      expect(Array.isArray(response.body.users) || typeof response.body.users === 'object').toBe(true);
    });
  });

  describe('POST /api/users', () => {
    it('should create a new user', async () => {
      const userData = {
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123'
      };

      const response = await request(app)
        .post('/api/users')
        .send(userData)
        .expect(201);
      
      expect(response.body).toHaveProperty('user');
    });
  });
});