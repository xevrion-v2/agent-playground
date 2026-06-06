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
      expect(Array.isArray(response.body.users)).toBe(true);
    });

    it('should return users array in response body', async () => {
      const response = await request(app).get('/users');
      
      expect(response.body).toHaveProperty('users');
    });
  });

  describe('POST /users', () => {
    it('should create a user and return 201 status', async () => {
      const newUser = {
        name: 'John Doe',
        email: 'john@example.com',
      };

      const response = await request(app)
        .post('/users')
        .send(newUser);

      expect(response.status).toBe(201);
      expect(response.body).toBeDefined();
    });

    it('should return the created user in response', async () => {
      const newUser = {
        name: 'Jane Doe',
        email: 'jane@example.com',
      };

      const response = await request(app)
        .post('/users')
        .send(newUser);

      expect(response.body).toHaveProperty('id');
      expect(response.body.name).toBe(newUser.name);
      expect(response.body.email).toBe(newUser.email);
    });

    it('should handle request without body', async () => {
      const response = await request(app)
        .post('/users')
        .send({});

      expect(response.status).toBe(201);
    });

    it('should handle user with minimal data', async () => {
      const minimalUser = {
        name: 'Minimal User',
      };

      const response = await request(app)
        .post('/users')
        .send(minimalUser);

      expect(response.status).toBe(201);
      expect(response.body.name).toBe(minimalUser.name);
    });
  });

  describe('Route existence', () => {
    it('should have the user routes mounted', () => {
      expect(userRoutes).toBeDefined();
      expect(typeof userRoutes).toBe('function');
    });
  });
});