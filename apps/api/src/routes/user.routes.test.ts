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

    it('should return users with expected properties', async () => {
      const response = await request(app).get('/users');
      
      expect(response.status).toBe(200);
      response.body.forEach((user: any) => {
        expect(user).toHaveProperty('id');
        expect(user).toHaveProperty('email');
      });
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
      expect(response.body).toHaveProperty('id');
      expect(response.body.email).toBe(newUser.email);
      expect(response.body.name).toBe(newUser.name);
    });

    it('should return 400 when email is missing', async () => {
      const invalidUser = {
        name: 'Test User',
        password: 'securepassword123'
      };

      const response = await request(app)
        .post('/users')
        .send(invalidUser);
      
      expect(response.status).toBe(400);
    });

    it('should return 400 when email format is invalid', async () => {
      const invalidUser = {
        email: 'not-an-email',
        name: 'Test User',
        password: 'securepassword123'
      };

      const response = await request(app)
        .post('/users')
        .send(invalidUser);
      
      expect(response.status).toBe(400);
    });

    it('should not return password in response', async () => {
      const newUser = {
        email: 'secure@example.com',
        name: 'Secure User',
        password: 'securepassword123'
      };

      const response = await request(app)
        .post('/users')
        .send(newUser);
      
      expect(response.body).not.toHaveProperty('password');
    });
  });
});