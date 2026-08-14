import { describe, it, expect, jest } from '@jest/globals';
import { prisma } from '@/lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';
import { createUser, getUsers } from './index';

jest.mock('@/lib/prisma', () => ({
  user: {
    findMany: jest.fn(),
    create: jest.fn(),
  },
}));

describe('GET /api/users', () => {
  it('should return a list of users', async () => {
    const mockUsers = [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }];
    (prisma.user.findMany as jest.Mock).mockResolvedValue(mockUsers);

    const req: NextApiRequest = { query: {} } as NextApiRequest;
    const res: NextApiResponse = {
      status: jest.fn(),
      json: jest.fn(),
    } as NextApiResponse;

    await getUsers(req, res);

    expect(prisma.user.findMany).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith(mockUsers);
  });
});

describe('POST /api/users', () => {
  it('should create a new user', async () => {
    const mockUser = { id: 1, name: 'Charlie' };
    (prisma.user.create as jest.Mock).mockResolvedValue(mockUser);

    const req: NextApiRequest = {
      body: { name: 'Charlie' },
    } as NextApiRequest;
    const res: NextApiResponse = {
      status: jest.fn(),
      json: jest.fn(),
    } as NextApiResponse;

    await createUser(req, res);

    expect(prisma.user.create).toHaveBeenCalledWith({
      data: { name: 'Charlie' },
    });
    expect(res.json).toHaveBeenCalledWith(mockUser);
  });
});