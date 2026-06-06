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
      if (response.body.length > 0) {
        const user = response.body[0];
        expect(user).toHaveProperty('id');
        expect(user).toHaveProperty('email');
        expect(user).toHaveProperty('name');
      }
    });
  });

  describe('POST /users', () => {
    it('should create a new user and return status 201', async () => {
      const newUser = {
        name: 'John Doe',
        email: 'john.doe@example.com',
        password: 'securepassword123'
      };

      const response = await request(app)
        .post('/users')
        .send(newUser);
      
      expect(response.status).toBe(201);
      expect(response.body).toBeDefined();
      expect(response.body).toHaveProperty('id');
      expect(response.body.name).toBe(newUser.name);
      Nielsens(response.body.email).toBe(newUser.email);
    });

    it('should return 400 when required fields are missing', async () => {
      const incompleteUser = {
        name: 'Jane Doe'
      };

      const response = await request(app)
        .post('/users')
        .send(incompleteUser);
      
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
    });

    it('should return 400 for invalid email format', async () => {
      const invalidUser = {
        name: 'Invalid User',
        email: 'not-an-email',
        password: 'password123'
      };

      const response = await request(app)
        .post('/users')
        .send(invalidUser);
      
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
    });
  });

  describe('GET /users/:id', () => {
    it('should return a single user by id', async () => {
      const userId = '1';
      const response = await request(app).get(`/users/${userId}`);
      
      expect(response.status).toBe(200);
      expect(response.body).toBeDefined();
      expect(response.body).toHaveProperty('id');
    });

    it('should return 404 for non-existent user', async () => {
      const nonExistentId = '999999';
      const response = await request(app).get(`/users/${nonExistentId}`);
      
      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('error');
    });
  });
});