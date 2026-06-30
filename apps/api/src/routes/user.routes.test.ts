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

    it('should return users array in the response', async () => {
      const response = await request(app).get('/users');
      
      expect(response.body).toEqual(
        expect.objectContaining({
          users: expect.any(Array)
        })
      );
    });
  });

  describe('POST /users', () => {
    it('should create a user and return status 201', async () => {
      const newUser = {
        name: 'John Doe',
        email: 'john@example.com'
      };

      const response = await request(app)
        .post('/users')
        .send(newUser);
      
      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('id');
      expect(response.body).toHaveProperty('name', newUser.name);
      expect(response.body).toHaveProperty('email', newUser.email);
    });

    it('should create a user with the provided data', async () => {
      const newUser = {
        name: 'Jane Smith',
        email: 'jane@example.com'
      };

      const response = await request(app)
        .post('/users')
        .send(newUser);
      
      expect(response.body).toMatchObject(newUser);
    });

    it('should handle empty request body', async () => {
      const response = await request(app)
        .post('/users')
        .send({});
      
      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('id');
    });

    it('should handle request with extra fields', async () => {
      const userWithExtra = {
        name: 'Extra User',
        email: 'extra@example.com',
        extraField: 'should be ignored or handled'
      };

      const response = await request(app)
        .post('/users')
        .send(userWithExtra);
      
      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('name', 'Extra User');
    });
  });
});