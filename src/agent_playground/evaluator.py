"""
Evaluator module for the Agent Playground.
"""

from typing import Any, Dict, List


class Evaluator:
    """Evaluates agent performance."""

    def __init__(self, metrics: List[str]):
        self.metrics = metrics
        self.results: Dict[str, List[float]] = {metric: [] for metric in metrics}

    def evaluate_episode(self, episode_data: Dict[str, Any]) -> Dict[str, float]:
        """
        Evaluate a single episode.

        Args:
            episode_data: Data from the episode.

        Returns:
            A dictionary of metric scores for this episode.
        """
        scores = {}
        for metric in self.metrics:
            if metric == "total_reward":
                scores[metric] = sum(
                    step.get("reward", 0) for step in episode_data.get("steps", [])
                )
            elif metric == "steps_taken":
                scores[metric] = len(episode_data.get("steps", []))
            elif metric == "success_rate":
                success = episode_data.get("success", False)
                scores[metric] = 1.0 if success else 0.0
            else:
                scores[metric] = 0.0

        # Store results
        for metric, score in scores.items():
            self.results[metric].append(score)

        return scores

    def get_summary(self) -> Dict[str, Any]:
        """
        Get a summary of all evaluations.

        Returns:
            A dictionary with summary statistics.
        """
        summary = {}
        for metric, values in self.results.items():
            if values:
                summary[metric] = {
                    "mean": sum(values) / len(values),
                    "min": min(values),
                    "max": max(values),
                    "count": len(values),
                }
            else:
                summary[metric] = {
                    "mean": 0.0,
                    "min": 0.0,
                    "max": 0.0,
                    "count": 0,
                }
        return summary