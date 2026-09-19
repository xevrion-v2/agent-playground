import pytest
from src.agents.xevrion import XevrionAgent

def test_xevrion_initialization():
    """Test that xevrion agent initializes correctly."""
    agent = XevrionAgent({"test": True})
    assert agent.initialized == False
    agent.initialize()
    assert agent.initialized == True
    assert agent.state["status"] == "ready"

def test_xevrion_process():
    """Test processing functionality."""
    agent = XevrionAgent({})
    result = agent.process({"test": "data"})
    assert result["processed"] == True
    assert result["input"]["test"] == "data"
    assert agent.initialized == True

def test_xevrion_empty_input():
    """Test handling of empty input."""
    agent = XevrionAgent({})
    result = agent.process({})
    assert "error" in result
    assert result["error"] == "No input data provided"

def test_xevrion_status():
    """Test status reporting."""
    agent = XevrionAgent({})
    status = agent.get_status()
    assert status["initialized"] == False
    agent.initialize()
    status = agent.get_status()
    assert status["initialized"] == True
    assert "state" in status