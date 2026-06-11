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
      expect(response.body).toHaveProperty('users');
      expect(Array.isArray(response.body.users)).toBe(true);
    });

    it('should return users array with default pagination', async () => {
      const response = await request(app).get('/users');
      
      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        users: expect.any(Array),
        page: expect.any(Number),
        limit: expect.any(Number),
        total: expect.any(Number),
      });
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
      expect(response.body).toHaveProperty('id');
      expect(response.body.email).toBe(newUser.email);
      expect(response.body.name).toBe(newUser.name);
      expect(response.body).not.toHaveProperty('password');
    });

    it('should return 400 for invalid user data', async () => {
      const invalidUser = {
        email: 'invalid-email',
        name: '',
      };

      const response = await request(app)
        .post('/users')
        .send(invalidUser);

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
    });

    it('should return 400 when required fields are missing', async () => {
      const emptyUser = {};

      const response = await request(app)
        .post('/users')
        .send(emptyUser);

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
    });

    it('should return 409 when email already exists', async () => {
      const existingUser = {
        email: 'existing@example.com',
        name: 'Existing User',
        password: 'password123',
      };

      const response = await request(app)
        .post('/users')
        .send(existingUser);

      expect(response.status).toBe(409);
      expect(response.body).toHaveProperty('error');
    });
  });

  describe('GET /users/:id', () => {
    it('should return a single user by id', async () => {
      const userId = '123e4567-e89b-12d3-a456-426614174000';
      const response = await request(app).get(`/users/${userId}`);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('id', userId);
    });

    it('should return 404 for non-existent user', async () => {
      const response = await request(app).get('/users/non-existent-id');

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('error');
    });
  });
});