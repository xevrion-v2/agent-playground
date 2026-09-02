import request from 'supertest';
import app from '../src/app';
import { createUser, getUserById, getAllUsers } from '../src/services/userService';
import { User } from '../src/types';

// Mock the user service
jest.mock('../src/services/userService');

describe('User Routes', () => {
  const mockUser: User = {
    id: '1',
    username: 'testuser',
    email: 'test@example.com',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /users', () => {
    it('should return all users', async () => {
      (getAllUsers as jest.Mock).mockResolvedValue([mockUser]);

      const res = await request(app).get('/api/users');

      expect(res.status).toBe(200);
      expect(res.body).toEqual([mockUser]);
      expect(getAllUsers).toHaveBeenCalled();
    });

    it('should return empty array when no users exist', async () => {
      (getAllUsers as jest.Mock).mockResolvedValue([]);

      const res = await request(app).get('/api/users');

      expect(res.status).toBe(200);
      expect(res.body).toEqual([]);
    });
  });

  describe('POST /users', () => {
    it('should create a new user', async () => {
      (createUser as jest.Mock).mockResolvedValue(mockUser);

      const res = await request(app)
        .post('/api/users')
        .send({ username: 'testuser', email: 'test@example.com' });

      expect(res.status).toBe(201);
      expect(res.body).toEqual(mockUser);
      expect(createUser).toHaveBeenCalledWith({ username: 'testuser', email: 'test@example.com' });
    });

    it('should return 400 for invalid input', async () => {
      const res = await request(app)
        .post('/api/users')
        .send({ username: '', email: 'invalid-email' });

      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty('error');
    });
  });

  describe('GET /users/:id', () => {
    it('should return a user by ID', async () => {
      (getUserById as jest.Mock).mockResolvedValue(mockUser);

      const res = await request(app).get('/api/users/1');

      expect(res.status).toBe(200);
      expect(res.body).toEqual(mockUser);
      expect(getUserById).toHaveBeenCalledWith('1');
    });

    it('should return 404 for non-existent user', async () => {
      (getUserById as jest.Mock).mockResolvedValue(null);

      const res = await request(app).get('/api/users/999');

      expect(res.status).toBe(404);
      expect(res.body).toHaveProperty('error', 'User not found');
    });

    it('should return 400 for invalid ID format', async () => {
      const res = await request(app).get('/api/users/invalid-id');

      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty('error');
    });
  });
});