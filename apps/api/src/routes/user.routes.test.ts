import request from 'supertest';
import express from 'express';
import userRoutes from './user.routes';

const app = express();
app.use(express.json());
app.use('/users', userRoutes);

describe('User Routes', () => {
  describe('GET /users', () => {
    it('should return a list of users with status 200', async () => {
      const response = await request(app).get('/users');
      
      expect(response.status).toBe(200);
      expect(response.body).toBeDefined();
      expect(Array.isArray(response.body)).toBe(true);
    });

    it('should handle query parameters for pagination', async () => {
      const response = await request(app)
        .get('/users')
        .query({ page: '1', limit: '10' });
      
      expect(response.status).toBe(200);
      expect(response.body).toBeDefined();
    });
  });

  describe('POST /users', () => {
    it('should create a new user and return 201 status', async () => {
      const newUser = {
        email: 'test@example.com',
        name: 'Test User',
        password: 'securepassword123',
      };

      const response = await request(app)
        .post('/users')
        .send(newUser);
      
      expect(response.status).toBe(201);
      expect(response.body).toBeDefined();
      expect(response.body.id).toBeDefined();
      expect(response.body.email).toBe(newUser.email);
      expect(response.body.name).toBe(newUser.name);
      expect(response.body.password).toBeUndefined();
    });

    it('should return 400 when required fields are missing', async () => {
      const invalidUser = {
        name: 'Test User',
      };

      const response = await request(app)
        .post('/users')
        .send(invalidUser);
      
      expect(response.status).toBe(400);
      expect(response.body).toBeDefined();
      expect(response.body.error).toBeDefined();
    });

    it('should return 400 for invalid email format', async () => {
      const invalidUser = {
        email: 'not-an-email',
        name: 'Test User',
        password: 'securepassword123',
      };

      const response = await request(app)
        .post('/users')
        .send(invalidUser);
      
      expect(response.status).toBe(400);
      expect(response.body.error).toBeDefined();
    });
  });

  describe('GET /users/:id', () => {
    it('should return a single user by id', async () => {
      const userId = '123e4567-e89b-12d3-a456-426614174000';
      
      const response = await request(app).get(`/users/${userId}`);
      
      expect(response.status).toBe(200);
      expect(response.body).toBeDefined();
      expect(response.body.id).toBe(userId);
    });

    it('should return 404 for non-existent user', async () => {
      const response = await request(app).get('/users/non-existent-id');
      
      expect(response.status).toBe(404);
      expect(response.body.error).toBeDefined();
    });
  });
});