"""
Tests for the Agent module.
"""

import pytest
from agent_playground.agent import Agent


class TestAgent(Agent):
    """Test agent implementation."""

    def act(self, observation):
        return {"action": "test", "observation": observation}


def test_agent_initialization():
    """Test agent initialization."""
    agent = TestAgent(name="TestAgent", capabilities=["move", "speak"])
    assert agent.name == "TestAgent"
    assert agent.capabilities == ["move", "speak"]
    assert agent.memory == []


def test_agent_remember():
    """Test agent memory."""
    agent = TestAgent(name="TestAgent", capabilities=[])
    experience = {"state": "test", "reward": 1.0}
    agent.remember(experience)
    assert len(agent.memory) == 1
    assert agent.memory[0] == experience


def test_agent_reflect():
    """Test agent reflection."""
    agent = TestAgent(name="TestAgent", capabilities=[])
    
    # Add some experiences
    agent.remember({"state": "good", "reward": 1.0})
    agent.remember({"state": "bad", "reward": -1.0})
    agent.remember({"state": "neutral"})  # No reward
    
    insights = agent.reflect()
    assert len(insights) == 2  # Only experiences with rewards
    
    # Check insights
    positive_insights = [i for i in insights if i["insight"] == "That worked well!"]
    negative_insights = [i for i in insights if i["insight"] == "Avoid that in future."]
    
    assert len(positive_insights) == 1
    assert len(negative_insights) == 1


def test_agent_act():
    """Test agent action."""
    agent = TestAgent(name="TestAgent", capabilities=[])
    observation = {"sensor": "value"}
    action = agent.act(observation)
    assert action == {"action": "test", "observation": observation}