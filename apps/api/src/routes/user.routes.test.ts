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
      // Verify each user has standard properties if array is non-empty
      if (response.body.length > 0) {
        const user = response.body[0];
        expect(user).toHaveProperty('id');
        expect(user).toHaveProperty('email');
      }
    });
  });

  describe('POST /users', () => {
    it('should create a new user and return status 201', async () => {
      const newUser = {
        email: 'test@example.com',
        name: 'Test User',
        password: 'securepassword123',
      };

      const response = await request(app)
        .post('/users')
        .send(newUser);

      expect(response.status).toBe(201);
      expect(response.body).toBeDefined();
    });

    it('should return the created user with an id', async () => {
      const newUser = {
        email: 'test2@example.com',
        name: 'Another Test User',
        password: 'anotherpassword123',
      };

      const response = await request(app)
        .post('/users')
        .send(newUser);

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('id');
      expect(response.body.email).toBe(newUser.email);
      expect(response.body.name).toBe(newUser.name);
      // Password should not be returned in response
      expect(response.body).not.toHaveProperty('password');
    });

    it('should handle missing required fields with status 400', async () => {
      const incompleteUser = {
        name: 'Incomplete User',
      };

      const response = await request(app)
        .post('/users')
        .send(incompleteUser);

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
    });
  });
});