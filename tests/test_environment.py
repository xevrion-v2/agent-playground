"""
Tests for the Environment module.
"""

import pytest
from agent_playground.environment import Environment


class TestEnvironment(Environment):
    """Test environment implementation."""

    def get_observation(self):
        return {"state": self.state}

    def calculate_reward(self, actions):
        return 1.0 if actions.get("action") == "correct" else -1.0

    def is_done(self):
        return self.step_count >= 5

    def get_initial_state(self):
        return {"initial": True}


def test_environment_initialization():
    """Test environment initialization."""
    env = TestEnvironment(name="TestEnv", initial_state={"test": True})
    assert env.name == "TestEnv"
    assert env.state == {"test": True}
    assert env.agents == []
    assert env.step_count == 0


def test_environment_reset():
    """Test environment reset."""
    env = TestEnvironment(name="TestEnv", initial_state={"test": True})
    env.state = {"changed": True}
    env.step_count = 10
    
    observation = env.reset()
    assert env.state == {"initial": True}
    assert env.step_count == 0
    assert observation == {"state": {"initial": True}}


def test_environment_step():
    """Test environment step."""
    env = TestEnvironment(name="TestEnv", initial_state={"initial": True})
    
    # First step
    result = env.step({"action": "correct"})
    assert env.step_count == 1
    assert result["observation"] == {"state": {"initial": True}}
    assert result["reward"] == 1.0
    assert result["done"] == False
    assert result["info"]["step"] == 1
    
    # Multiple steps until done
    for i in range(2, 6):
        result = env.step({"action": "wrong"})
        assert env.step_count == i
        assert result["reward"] == -1.0
        if i >= 5:
            assert result["done"] == True
        else:
            assert result["done"] == False


def test_environment_add_agent():
    """Test adding agent to environment."""
    env = TestEnvironment(name="TestEnv", initial_state={})
    
    class MockAgent:
        name = "TestAgent"
    
    agent = MockAgent()
    env.add_agent(agent)
    assert len(env.agents) == 1
    assert env.agents[0].name == "TestAgent"