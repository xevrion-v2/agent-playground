import unittest
from unittest.mock import patch, MagicMock
from leaderboard import Leaderboard

class TestLeaderboardUpdates(unittest.TestCase):
    def setUp(self):
        self.leaderboard = Leaderboard()
    
    def test_update_with_valid_score(self):
        """Test updating leaderboard with valid player score"""
        self.leaderboard.update("player1", 100)
        self.assertEqual(self.leaderboard.get_rank("player1"), 1)
    
    def test_update_multiple_players(self):
        """Test updating leaderboard with multiple players"""
        self.leaderboard.update("player1", 100)
        self.leaderboard.update("player2", 200)
        self.leaderboard.update("player3", 150)
        
        rankings = self.leaderboard.get_leaderboard()
        self.assertEqual(rankings[0][0], "player2")
        self.assertEqual(rankings[1][0], "player3")
        self.assertEqual(rankings[2][0], "player1")
    
    def test_update_duplicate_score(self):
        """Test updating with duplicate scores"""
        self.leaderboard.update("player1", 100)
        self.leaderboard.update("player2", 100)
        
        rankings = self.leaderboard.get_leaderboard()
        self.assertEqual(len(rankings), 2)
        self.assertIn("player1", [p[0] for p in rankings])
        self.assertIn("player2", [p[0] for p in rankings])
    
    def test_empty_leaderboard(self):
        """Test leaderboard operations on empty leaderboard"""
        rankings = self.leaderboard.get_leaderboard()
        self.assertEqual(len(rankings), 0)
        
        rank = self.leaderboard.get_rank("nonexistent")
        self.assertIsNone(rank)
    
    def test_update_with_negative_score(self):
        """Test updating with negative score"""
        self.leaderboard.update("player1", -50)
        self.assertEqual(self.leaderboard.get_rank("player1"), 1)

if __name__ == '__main__':
    unittest.main()