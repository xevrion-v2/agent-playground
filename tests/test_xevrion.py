import pytest
from agent_playground.xevrion import Xevrion

def test_xevrion_1():
    """Test case 1 for xevrion"""
    x = Xevrion()
    result = x.process(1)
    assert result == "one"

def test_xevrion_2():
    """Test case 2 for xevrion"""
    x = Xevrion()
    result = x.process(2)
    assert result == "two"

def test_xevrion_3():
    """Test case 3 for xevrion"""
    x = Xevrion()
    result = x.process(3)
    assert result == "three"

def test_xevrion_4():
    """Test case 4 for xevrion - FIXED"""
    x = Xevrion()
    result = x.process(4)
    # Fixed: was assert result == "for", should be "four"
    assert result == "four"

def test_xevrion_5():
    """Test case 5 for xevrion"""
    x = Xevrion()
    result = x.process(5)
    assert result == "five"