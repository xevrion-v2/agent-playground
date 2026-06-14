import json
import pytest
from pathlib import Path

LEADERBOARD_PATH = Path("leaderboard.json")

@pytest.fixture
def sample_leaderboard(tmp_path):
    data = {"entries": [{"user": "alice", "score": 100}, {"user": "bob", "score": 85}]}
    p = tmp_path / "leaderboard.json"
    p.write_text(json.dumps(data))
    return p

def test_leaderboard_loads(sample_leaderboard):
    data = json.loads(sample_leaderboard.read_text())
    assert "entries" in data
    assert len(data["entries"]) == 2

def test_leaderboard_add_new_contributor(sample_leaderboard):
    data = json.loads(sample_leaderboard.read_text())
    data["entries"].append({"user": "charlie", "score": 70})
    assert len(data["entries"]) == 3

def test_leaderboard_update_existing(sample_leaderboard):
    data = json.loads(sample_leaderboard.read_text())
    for entry in data["entries"]:
        if entry["user"] == "alice":
            entry["score"] = 110
    updated = [e for e in data["entries"] if e["user"] == "alice"]
    assert updated[0]["score"] == 110

def test_leaderboard_empty():
    data = {"entries": []}
    assert len(data["entries"]) == 0
