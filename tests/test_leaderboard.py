import unittest
import json
import os
import tempfile
from scripts.update_leaderboard import update_leaderboard

class TestLeaderboardUpdate(unittest.TestCase):
    def setUp(self):
        self.temp_dir = tempfile.TemporaryDirectory()
        self.filepath = os.path.join(self.temp_dir.name, 'leaderboard.json')
        
    def tearDown(self):
        self.temp_dir.cleanup()
        
    def test_update_new_contributor(self):
        # Update a contributor in a non-existent file
        update_leaderboard('new_user', self.filepath)
        
        with open(self.filepath, 'r') as f:
            data = json.load(f)
        
        self.assertEqual(data.get('new_user'), 1)
        
    def test_update_existing_contributor(self):
        # Setup existing contributor data
        existing_data = {'existing_user': 5}
        with open(self.filepath, 'w') as f:
            json.dump(existing_data, f)
            
        update_leaderboard('existing_user', self.filepath)
        
        with open(self.filepath, 'r') as f:
            data = json.load(f)
            
        self.assertEqual(data.get('existing_user'), 6)
        
if __name__ == '__main__':
    unittest.main()
