"""
Tests for the Task module.
"""

from agent_playground.task import Task


def test_task_initialization():
    """Test task initialization."""
    task = Task(
        name="Test Task",
        description="A test task",
        success_criteria=["criterion1", "criterion2"]
    )
    
    assert task.name == "Test Task"
    assert task.description == "A test task"
    assert task.success_criteria == ["criterion1", "criterion2"]
    assert task.completed == False
    assert task.progress == {}


def test_task_update_progress():
    """Test updating task progress."""
    task = Task(
        name="Test Task",
        description="A test task",
        success_criteria=["criterion1", "criterion2"]
    )
    
    # Update progress
    task.update_progress("criterion1", True)
    assert task.progress == {"criterion1": True}
    assert task.completed == False  # Still missing criterion2
    
    task.update_progress("criterion2", True)
    assert task.progress == {"criterion1": True, "criterion2": True}
    assert task.completed == True  # Both criteria met


def test_task_get_status():
    """Test getting task status."""
    task = Task(
        name="Test Task",
        description="A test task",
        success_criteria=["criterion1", "criterion2"]
    )
    
    task.update_progress("criterion1", True)
    status = task.get_status()
    
    assert status["name"] == "Test Task"
    assert status["description"] == "A test task"
    assert status["completed"] == False
    assert status["progress"] == {"criterion1": True}
    assert status["success_criteria"] == ["criterion1", "criterion2"]