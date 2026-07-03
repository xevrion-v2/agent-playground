import request from 'supertest';
import express from 'express';
import userRoutes from './user.routes';

const app = express();
app.use(express.json());
app.use('/users', userRoutes);

describe('User Routes', () => {
  describe('GET /users', () => {
    it('should return a list of users with 200 status', async () => {
      const response = await request(app).get('/users');
      
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('users');
      expect(Array.isArray(response.body.users)).toBe(true);
    });

    it('should return users with default pagination', async () => {
      const response = await request(app).get('/users');
      
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('page', 1);
      expect(response.body).toHaveProperty('limit');
      expect(response.body).toHaveProperty('total');
    });

    it('should handle query parameters for pagination', async () => {
      const response = await request(app)
        .get('/users')
        .query({ page: 2, limit: 10 });
      
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('page', 2);
      expect(response.body).toHaveProperty('limit', 10);
    });
  });

  describe('POST /users', () => {
    it('should create a new user and return 201 status', async () => {
      const newUser = {
        email: 'test@example.com',
        name: 'Test User',
        password: 'securePassword123'
      };

      const response = await request(app)
        .post('/users')
        .send(newUser);
      
      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('id');
      expect(response.body).toHaveProperty('email', newUser.email);
      expect(response.body).toHaveProperty('name', newUser.name);
      expect(response.body).not.toHaveProperty('password');
    });

    it('should return 400 for missing required fields', async () => {
      const invalidUser = {
        name: 'Test User'
      };

      const response = await request(app)
        .post('/users')
        .send(invalidUser);
      
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
    });

    it('should return 400 for invalid email format', async () => {
      const invalidUser = {
        email: 'not-an-email',
        name: 'Test User',
        password: 'securePassword123'
      };

      const response = await request(app)
        .post('/users')
        .send(invalidUser);
      
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
    });
  });
});