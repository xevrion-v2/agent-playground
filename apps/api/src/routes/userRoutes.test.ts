import request from 'supertest';
import express from 'express';
import userRoutes from './userRoutes';

const app = express();
app.use(express.json());
app.use('/users', userRoutes);

describe('User Routes', () => {
  describe('GET /users', () => {
    it('should return a list of users with status 200', async () => {
      const response = await request(app).get('/users');
      expect(response.status).toBe(200);
      expect(response.body).toEqual({ users: [], message: 'List users stub' });
    });
  });

  describe('POST /users', () => {
    it('should create a user and return status 201', async () => {
      const newUser = { name: 'Test User', email: 'test@example.com' };
      const response = await request(app)
        .post('/users')
        .send(newUser)
        .set('Content-Type', 'application/json');
      expect(response.status).toBe(201);
      expect(response.body).toEqual({
        user: newUser,
        message: 'Create user stub',
      });
    });

    it('should return 400 if required fields are missing', async () => {
      const response = await request(app)
        .post('/users')
        .send({})
        .set('Content-Type', 'application/json');
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
    });
  });
});