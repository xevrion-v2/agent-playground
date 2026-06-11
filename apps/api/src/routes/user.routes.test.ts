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

    it('should return an empty array when no users exist', async () => {
      const response = await request(app).get('/users');
      
      expect(response.status).toBe(200);
      expect(response.body).toEqual([]);
    });
  });

  describe('POST /users', () => {
    it('should create a new user and return 201 status', async () => {
      const newUser = {
        name: 'John Doe',
        email: 'john.doe@example.com',
      };

      const response = await request(app)
        .post('/users')
        .send(newUser);
      
      expect(response.status).toBe(201);
      expect(response.body).toBeDefined();
      expect(response.body).toHaveProperty('id');
      expect(response.body.name).toBe(newUser.name);
      expect(response.body.email).toBe(newUser.email);
    });

    it('should return 400 when required fields are missing', async () => {
      const invalidUser = {
        name: 'Jane Doe',
      };

      const response = await request(app)
        .post('/users')
        .send(invalidUser);
      
      expect(response.status).toBe(400);
      expect(response.body).toBeDefined();
      expect(response.body).toHaveProperty('error');
    });

    it('should return 400 when email is invalid', async () => {
      const invalidUser = {
        name: 'Jane Doe',
        email: 'invalid-email',
      };

      const response = await request(app)
        .post('/users')
        .send(invalidUser);
      
      expect(response.status).toBe(400);
      expect(response.body).toBeDefined();
      expect(response.body).toHaveProperty('error');
    });

    it('should handle empty request body', async () => {
      const response = await request(app)
        .post('/users')
        .send({});
      
      expect(response.status).toBe(400);
      expect(response.body).toBeDefined();
      expect(response.body).toHaveProperty('error');
    });
  });

  describe('GET /users/:id', () => {
    it('should return 404 for non-existent user', async () => {
      const response = await request(app).get('/users/non-existent-id');
      
      expect(response.status).toBe(404);
    });
  });
});