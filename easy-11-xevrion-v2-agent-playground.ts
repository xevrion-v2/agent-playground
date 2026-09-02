import { describe, it, expect, beforeEach } from '@jest/globals';
import { Leaderboard } from '../src/leaderboard';

describe('Leaderboard', () => {
  let leaderboard: Leaderboard;

  beforeEach(() => {
    leaderboard = new Leaderboard();
  });

  it('should add a new player with score', () => {
    leaderboard.updateScore('player1', 100);
    expect(leaderboard.getScore('player1')).toBe(100);
  });

  it('should update existing player score', () => {
    leaderboard.updateScore('player1', 100);
    leaderboard.updateScore('player1', 150);
    expect(leaderboard.getScore('player1')).toBe(150);
  });

  it('should handle negative score updates', () => {
    leaderboard.updateScore('player1', 100);
    leaderboard.updateScore('player1', -50);
    expect(leaderboard.getScore('player1')).toBe(50);
  });

  it('should sort players by score in descending order', () => {
    leaderboard.updateScore('player1', 100);
    leaderboard.updateScore('player2', 200);
    leaderboard.updateScore('player3', 150);
    
    const topPlayers = leaderboard.getTopPlayers(3);
    expect(topPlayers).toEqual([
      { player: 'player2', score: 200 },
      { player: 'player3', score: 150 },
      { player: 'player1', score: 100 }
    ]);
  });

  it('should return empty array for non-existent players', () => {
    expect(leaderboard.getScore('nonexistent')).toBeUndefined();
  });

  it('should limit top players count', () => {
    leaderboard.updateScore('player1', 100);
    leaderboard.updateScore('player2', 200);
    leaderboard.updateScore('player3', 150);
    
    const topPlayers = leaderboard.getTopPlayers(2);
    expect(topPlayers).toHaveLength(2);
    expect(topPlayers[0].player).toBe('player2');
  });

  it('should handle duplicate player updates correctly', () => {
    leaderboard.updateScore('player1', 100);
    leaderboard.updateScore('player1', 50);
    leaderboard.updateScore('player1', 200);
    
    const topPlayers = leaderboard.getTopPlayers(1);
    expect(topPlayers[0]).toEqual({ player: 'player1', score: 200 });
  });
});