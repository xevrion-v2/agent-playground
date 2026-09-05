"""
Agent module for the Agent Playground.
"""

import logging
from typing import Any, Dict, List, Optional

logger = logging.getLogger(__name__)


class Agent:
    """Base class for AI agents."""

    def __init__(self, name: str, capabilities: List[str]):
        self.name = name
        self.capabilities = capabilities
        self.memory: List[Dict[str, Any]] = []

    def act(self, observation: Dict[str, Any]) -> Dict[str, Any]:
        """
        Take an action based on the observation.

        Args:
            observation: The current observation from the environment.

        Returns:
            An action to take.
        """
        raise NotImplementedError

    def remember(self, experience: Dict[str, Any]):
        """
        Store an experience in memory.

        Args:
            experience: The experience to remember.
        """
        self.memory.append(experience)
        logger.debug(f"Agent {self.name} remembered experience: {experience}")

    def reflect(self) -> List[Dict[str, Any]]:
        """
        Reflect on past experiences.

        Returns:
            A list of insights from reflection.
        """
        insights = []
        for exp in self.memory[-10:]:  # Last 10 experiences
            if "reward" in exp and exp["reward"] > 0:
                insights.append({"experience": exp, "insight": "That worked well!"})
            elif "reward" in exp and exp["reward"] < 0:
                insights.append({"experience": exp, "insight": "Avoid that in future."})
        return insights