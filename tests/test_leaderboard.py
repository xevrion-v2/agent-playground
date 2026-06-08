import unittest
from unittest.mock import patch
from api.leaderboard import update_leaderboard

class TestLeaderboardUpdate(unittest.TestCase):
    @patch('api.leaderboard.get_contributors')
    def test_update_leaderboard_new_contributor(self, mock_get_contributors):
        # Mock the return value of get_contributors to simulate a new contributor
        mock_get_contributors.return_value = [
            {'username': 'new_user', 'score': 10}
        ]
        
        # Call the function to update the leaderboard
        result = update_leaderboard()
        
        # Assert that the result is as expected
        self.assertEqual(result, {'new_user': 10})

    @patch('api.leaderboard.get_contributors')
    def test_update_leaderboard_existing_contributor(self, mock_get_contributors):
        # Mock the return value of get_contributors to simulate an existing contributor
        mock_get_contributors.return_value = [
            {'username': 'existing_user', 'score': 5}
        ]
        
        # Call the function to update the leaderboard
        result = update_leaderboard()
        
        # Assert that the result is as expected
        self.assertEqual(result, {'existing_user': 15})

if __name__ == '__main__':
    unittest.main()