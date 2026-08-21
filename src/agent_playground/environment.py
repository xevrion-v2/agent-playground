"""
Environment module for the Agent Playground.
"""

import logging
from typing import Any, Dict, List, Optional

logger = logging.getLogger(__name__)


class Environment:
    """Base class for environments."""

    def __init__(self, name: str, initial_state: Dict[str, Any]):
        self.name = name
        self.state = initial_state
        self.agents: List[Any] = []
        self.step_count = 0

    def reset(self) -> Dict[str, Any]:
        """
        Reset the environment to its initial state.

        Returns:
            The initial observation.
        """
        self.state = self.get_initial_state()
        self.step_count = 0
        logger.info(f"Environment {self.name} reset")
        return self.get_observation()

    def step(self, actions: Dict[str, Any]) -> Dict[str, Any]:
        """
        Take a step in the environment.

        Args:
            actions: Actions from agents.

        Returns:
            A tuple of (observation, reward, done, info).
        """
        self.step_count += 1
        observation = self.get_observation()
        reward = self.calculate_reward(actions)
        done = self.is_done()
        info = {"step": self.step_count}

        logger.debug(
            f"Step {self.step_count}: observation={observation}, reward={reward}, done={done}"
        )

        return {
            "observation": observation,
            "reward": reward,
            "done": done,
            "info": info,
        }

    def get_observation(self) -> Dict[str, Any]:
        """Get the current observation."""
        raise NotImplementedError

    def calculate_reward(self, actions: Dict[str, Any]) -> float:
        """Calculate the reward for the given actions."""
        raise NotImplementedError

    def is_done(self) -> bool:
        """Check if the episode is done."""
        raise NotImplementedError

    def get_initial_state(self) -> Dict[str, Any]:
        """Get the initial state of the environment."""
        raise NotImplementedError

    def add_agent(self, agent: Any):
        """Add an agent to the environment."""
        self.agents.append(agent)
        logger.info(f"Added agent {agent.name} to environment {self.name}")