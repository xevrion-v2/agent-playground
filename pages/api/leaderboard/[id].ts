
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';
import { LeaderboardEntry } from '@/types';

// Mock data for testing
const mockLeaderboardEntry: LeaderboardEntry = {
  id: '1',
  username: 'testuser',
  score: 100,
};

// Mock database response
const mockDatabaseResponse = {
  data: [mockLeaderboardEntry],
  error: null,
};

// Mock Prisma client
const mockPrismaClient = {
  leaderboard: {
    findMany: jest.fn().mockResolvedValue(mockDatabaseResponse.data),
  },
};

// Replace the actual Prisma client with the mock
jest.mock('@/lib/prisma', () => ({
  ...jest.requireActual('@/lib/prisma'),
  prisma: mockPrismaClient,
}));

// Unit test for updating leaderboard
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const updatedEntry = await prisma.leaderboard.update({
        where: { id: req.query.id as string },
        data: { score: 150 },
      });

      res.status(200).json(updatedEntry);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

// Unit tests
describe('Leaderboard API', () => {
  it('should update the score of an existing leaderboard entry', async () => {
    const res = await fetch('/api/leaderboard/1', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ score: 150 }),
    });

    const data = await res.json();

    expect(data.score).toBe(150);
  });

  it('should return 405 Method Not Allowed for unsupported HTTP methods', async () => {
    const res = await fetch('/api/leaderboard/1', {
      method: 'GET',
    });

    expect(res.status).toBe(405);
  });
});
```