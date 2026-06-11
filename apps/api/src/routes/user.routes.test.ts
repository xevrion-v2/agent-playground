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
    it('should create a user and return status 201', async () => {
      const newUser = {
        name: 'John Doe',
        email: 'john.doe@example.com'
      };

      const response = await request(app)
        .post('/users')
        .send(newUser);
      
      expect(response.status).toBe(201);
      expect(response.body).toBeDefined();
    });

    it('should return the created user in response body', async () => {
      const newUser = {
        name: 'Jane Doe',
        email: 'jane.doe@example.com'
      };

      const response = await request(app)
        .post('/users')
        .send(newUser);
      
      expect(response.body).toHaveProperty('user');
    });

    it('should handle request with empty body', async () => {
      const response = await request(app)
        .post('/users')
        .send({});
      
      expect(response.status).toBe(201);
    });

    it('should handle request with partial user data', async () => {
      const partialUser = {
        name: 'Partial User'
      };

      const response = await request(app)
        .post('/users')
        .send(partialUser);
      
      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('user');
    });
  });

  describe('Route configuration', () => {
    it('should handle GET request to base path', async () => {
      const response = await request(app).get('/users');
      
      expect(response.status).not.toBe(404);
    });
  });
});