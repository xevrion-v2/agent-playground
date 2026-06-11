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
        email: 'test@example.com',
        name: 'Test User',
      };

      const response = await request(app)
        .post('/users')
        .send(newUser);

      expect(response.status).toBe(201);
      expect(response.body).toBeDefined();
    });

    it('should return the created user in response body', async () => {
      const newUser = {
        email: 'test@example.com',
        name: 'Test User',
      };

      const response = await request(app)
        .post('/users')
        .send(newUser);

      expect(response.body).toHaveProperty('id');
      expect(response.body.email).toBe(newUser.email);
      expect(response.body.name).toBe(newUser.name);
    });

    it('should handle user creation with minimal data', async () => {
      const minimalUser = {
        email: 'minimal@example.com',
      };

      const response = await request(app)
        .post('/users')
        .send(minimalUser);

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('id');
    });

    it('should return 400 for invalid request body', async () => {
      const response = await request(app).post('/users').send({});

      expect(response.status).toBe(400);
    });
  });
});