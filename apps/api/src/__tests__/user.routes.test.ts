import request from 'supertest';
import express from 'express';
import userRoutes from '../routes/user.routes';

describe('User Routes', () => {
  let app: express.Application;

  beforeEach(() => {
    app = express();
    app.use(express.json());
    app.use('/users', userRoutes);
  });

  describe('GET /users', () => {
    it('should return a list of users with status 200', async () => {
      const response = await request(app).get('/users');

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('users');
      expect(Array.isArray(response.body.users)).toBe(true);
    });

    it('should return an empty users array by default', async () => {
      const response = await request(app).get('/users');

      expect(response.body.users).toEqual([]);
    });

    it('should return JSON content type', async () => {
      const response = await request(app).get('/users');

      expect(response.headers['content-type']).toMatch(/json/);
    });
  });

  describe('POST /users', () => {
    it('should create a user and return status 201', async () => {
      const newUser = {
        name: 'John Doe',
        email: 'john@example.com',
      };

      const response = await request(app)
        .post('/users')
        .send(newUser)
        .set('Content-Type', 'application/json');

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('message', 'User created');
    });

    it('should handle empty request body gracefully', async () => {
      const response = await request(app)
        .post('/users')
        .send({})
        .set('Content-Type', 'application/json');

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('message', 'User created');
    });
  });
});