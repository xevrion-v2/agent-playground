"""
Tests for the Evaluator module.
"""

from agent_playground.evaluator import Evaluator


def test_evaluator_initialization():
    """Test evaluator initialization."""
    evaluator = Evaluator(metrics=["total_reward", "steps_taken", "success_rate"])
    
    assert evaluator.metrics == ["total_reward", "steps_taken", "success_rate"]
    assert evaluator.results == {
        "total_reward": [],
        "steps_taken": [],
        "success_rate": []
    }


def test_evaluator_evaluate_episode():
    """Test evaluating a single episode."""
    evaluator = Evaluator(metrics=["total_reward", "steps_taken", "success_rate"])
    
    episode_data = {
        "steps": [
            {"reward": 1.0},
            {"reward": 2.0},
            {"reward": -1.0}
        ],
        "success": True
    }
    
    scores = evaluator.evaluate_episode(episode_data)
    
    assert scores["total_reward"] == 2.0  # 1 + 2 - 1
    assert scores["steps_taken"] == 3
    assert scores["success_rate"] == 1.0
    
    # Check results storage
    assert evaluator.results["total_reward"] == [2.0]
    assert evaluator.results["steps_taken"] == [3]
    assert evaluator.results["success_rate"] == [1.0]


def test_evaluator_get_summary():
    """Test getting evaluation summary."""
    evaluator = Evaluator(metrics=["total_reward", "success_rate"])
    
    # Evaluate multiple episodes
    evaluator.evaluate_episode({
        "steps": [{"reward": 1.0}, {"reward": 2.0}],
        "success": True
    })
    
    evaluator.evaluate_episode({
        "steps": [{"reward": -1.0}],
        "success": False
    })
    
    summary = evaluator.get_summary()
    
    assert "total_reward" in summary
    assert "success_rate" in summary
    
    # Check total_reward summary
    total_reward_summary = summary["total_reward"]
    assert total_reward_summary["mean"] == 1.0  # (3 + -1) / 2
    assert total_reward_summary["min"] == -1.0
    assert total_reward_summary["max"] == 3.0
    assert total_reward_summary["count"] == 2
    
    # Check success_rate summary
    success_rate_summary = summary["success_rate"]
    assert success_rate_summary["mean"] == 0.5  # (1 + 0) / 2
    assert success_rate_summary["min"] == 0.0
    assert success_rate_summary["max"] == 1.0
    assert success_rate_summary["count"] == 2


def test_evaluator_empty_results():
    """Test summary with empty results."""
    evaluator = Evaluator(metrics=["total_reward"])
    
    summary = evaluator.get_summary()
    
    assert summary["total_reward"]["mean"] == 0.0
    assert summary["total_reward"]["min"] == 0.0
    assert summary["total_reward"]["max"] == 0.0
    assert summary["total_reward"]["count"] == 0