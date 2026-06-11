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

    it('should return users array in response', async () => {
      const response = await request(app).get('/users');
      
      expect(response.body.users).toBeDefined();
      expect(Array.isArray(response.body.users)).toBe(true);
    });
  });

  describe('POST /users', () => {
    it('should create a user and return status 201', async () => {
      const newUser = {
        name: 'John Doe',
        email: 'john.doe@example.com',
      };

      const response = await request(app)
        .post('/users')
        .send(newUser);

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('id');
      expect(response.body).toHaveProperty('name', newUser.name);
      expect(response.body).toHaveProperty('email', newUser.email);
    });

    it('should return the created user with generated id', async () => {
      const newUser = {
        name: 'Jane Doe',
        email: 'jane.doe@example.com',
      };

      const response = await request(app)
        .post('/users')
        .send(newUser);

      expect(response.body.id).toBeDefined();
      expect(typeof response.body.id).toBe('string');
    });

    it('should handle request without body', async () => {
      const response = await request(app)
        .post('/users')
        .send({});

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('id');
    });
  });

  describe('Route existence', () => {
    it('should handle GET request to /users', async () => {
      const response = await request(app).get('/users');
      expect(response.status).not.toBe(404);
    });

    it('should handle POST request to /users', async () => {
      const response = await request(app)
        .post('/users')
        .send({ name: 'Test', email: 'test@test.com' });
      expect(response.status).not.toBe(404);
    });

    it('should return 404 for undefined routes under /users', async () => {
      const response = await request(app).get('/users/undefined-route');
      expect(response.status).toBe(404);
    });
  });
});