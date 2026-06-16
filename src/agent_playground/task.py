"""
Task module for the Agent Playground.
"""

from typing import Any, Dict, List


class Task:
    """Represents a task for an agent to complete."""

    def __init__(self, name: str, description: str, success_criteria: List[str]):
        self.name = name
        self.description = description
        self.success_criteria = success_criteria
        self.completed = False
        self.progress: Dict[str, Any] = {}

    def update_progress(self, key: str, value: Any):
        """
        Update the progress of the task.

        Args:
            key: The progress metric to update.
            value: The new value.
        """
        self.progress[key] = value
        self.check_completion()

    def check_completion(self):
        """Check if the task has been completed based on success criteria."""
        # Simple completion check - all criteria must be met
        for criterion in self.success_criteria:
            if criterion not in self.progress or not self.progress[criterion]:
                self.completed = False
                return
        self.completed = True

    def get_status(self) -> Dict[str, Any]:
        """
        Get the current status of the task.

        Returns:
            A dictionary with task status information.
        """
        return {
            "name": self.name,
            "description": self.description,
            "completed": self.completed,
            "progress": self.progress,
            "success_criteria": self.success_criteria,
        }