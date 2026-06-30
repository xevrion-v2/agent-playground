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
      expect(Array.isArray(response.body.users) || typeof response.body === 'object').toBe(true);
    });

    it('should handle query parameters for pagination', async () => {
      const response = await request(app).get('/users?page=1&limit=10');
      
      expect(response.status).toBe(200);
      expect(response.body).toBeDefined();
    });
  });

  describe('POST /users', () => {
    it('should create a new user and return status 201', async () => {
      const newUser = {
        email: 'test@example.com',
        name: 'Test User',
        password: 'securepassword123'
      };

      const response = await request(app)
        .post('/users')
        .send(newUser);

      expect(response.status).toBe(201);
      expect(response.body).toBeDefined();
    });

    it('should return 400 for invalid user data', async () => {
      const invalidUser = {
        email: 'invalid-email',
        name: '',
        password: '123'
      };

      const response = await request(app)
        .post('/users')
        .send(invalidUser);

      expect(response.status).toBe(400);
    });

    it('should return 400 when required fields are missing', async () => {
      const incompleteUser = {
        email: 'test@example.com'
      };

      const response = await request(app)
        .post('/users')
        .send(incompleteUser);

      expect(response.status).toBe(400);
    });
  });

  describe('GET /users/:id', () => {
    it('should return a single user by id', async () => {
      const response = await request(app).get('/users/1');
      
      expect(response.status).toBe(200);
      expect(response.body).toBeDefined();
    });

    it('should return 404 for non-existent user', async () => {
      const response = await request(app).get('/users/999999');
      
      expect(response.status).toBe(404);
    });
  });
});