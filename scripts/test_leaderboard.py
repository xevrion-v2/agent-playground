#!/usr/bin/env python3
"""Unit tests for the leaderboard update script."""

import json
import os
import tempfile
import unittest

import sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from update_leaderboard import (
    load_leaderboard,
    save_leaderboard,
    add_contribution,
    remove_contributor,
    update_leaderboard,
)


class TestLeaderboardUpdate(unittest.TestCase):
    """Tests for leaderboard update functions."""

    def setUp(self):
        """Create a temporary leaderboard file for each test."""
        self.tmp = tempfile.NamedTemporaryFile(
            mode="w", suffix=".json", delete=False
        )
        self.initial_data = {
            "alice": 5,
            "bob": 3,
            "charlie": 10
        }
        json.dump(self.initial_data, self.tmp)
        self.tmp.close()
        self.path = self.tmp.name

    def tearDown(self):
        """Clean up temporary file."""
        os.unlink(self.path)

    def test_load_leaderboard(self):
        """Test loading leaderboard from file."""
        data = load_leaderboard(self.path)
        self.assertEqual(data, self.initial_data)

    def test_save_and_reload(self):
        """Test saving and reloading preserves data."""
        data = {"new_user": 1}
        save_leaderboard(data, self.path)
        loaded = load_leaderboard(self.path)
        self.assertEqual(loaded, data)

    def test_add_contribution_new_user(self):
        """Test adding contribution for a new user."""
        leaderboard = {}
        result = add_contribution(leaderboard, "new_user", 3)
        self.assertEqual(result["new_user"], 3)

    def test_add_contribution_existing_user(self):
        """Test incrementing contribution for an existing user."""
        result = add_contribution(self.initial_data, "alice", 2)
        self.assertEqual(result["alice"], 7)

    def test_add_contribution_default_count(self):
        """Test adding contribution with default count of 1."""
        result = add_contribution(self.initial_data, "bob")
        self.assertEqual(result["bob"], 4)

    def test_add_contribution_negative_raises(self):
        """Test that negative contribution count raises ValueError."""
        with self.assertRaises(ValueError):
            add_contribution(self.initial_data, "alice", -1)

    def test_add_contribution_empty_name_raises(self):
        """Test that empty contributor name raises ValueError."""
        with self.assertRaises(ValueError):
            add_contribution(self.initial_data, "", 1)

    def test_remove_contributor_existing(self):
        """Test removing an existing contributor."""
        result = remove_contributor(self.initial_data, "bob")
        self.assertTrue(result)
        self.assertNotIn("bob", self.initial_data)

    def test_remove_contributor_nonexistent(self):
        """Test removing a contributor that doesn't exist."""
        result = remove_contributor(self.initial_data, "nobody")
        self.assertFalse(result)

    def test_update_leaderboard_integration(self):
        """Test the full load-update-save cycle."""
        result = update_leaderboard("alice", 5, self.path)
        self.assertEqual(result["alice"], 10)
        # Verify persistence
        loaded = load_leaderboard(self.path)
        self.assertEqual(loaded["alice"], 10)

    def test_update_leaderboard_new_contributor(self):
        """Test full cycle with a new contributor."""
        result = update_leaderboard("dave", 7, self.path)
        self.assertEqual(result["dave"], 7)
        loaded = load_leaderboard(self.path)
        self.assertIn("dave", loaded)
        self.assertEqual(loaded["dave"], 7)

    def test_save_produces_valid_json(self):
        """Test that saved output is valid JSON."""
        save_leaderboard(self.initial_data, self.path)
        with open(self.path, "r") as f:
            loaded = json.load(f)
        self.assertIsInstance(loaded, dict)


if __name__ == "__main__":
    unittest.main()
