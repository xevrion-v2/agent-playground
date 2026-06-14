import { updateLeaderboard } from './leaderboard';

describe('leaderboard update script', () => {
  test('should add new contributor to empty leaderboard', () => {
    const current = {};
    const result = updateLeaderboard(current, '0x123');
    expect(result).toEqual({ '0x123': 1 });
  });

  test('should increment existing contributor score', () => {
    const current = { '0x123': 1 };
    const result = updateLeaderboard(current, '0x123');
    expect(result).toEqual({ '0x123': 2 });
  });
});
