import os
import sys
from typing import Dict, Any, Optional
import json

class Agent:
    """Base agent class for the playground."""
    
    def __init__(self, name: str = "default_agent", config: Optional[Dict[str, Any]] = None):
        self.name = name
        self.config = config or {}
        self.history = []
        
    def process(self, input_text: str) -> str:
        """Process input and return response."""
        # Base implementation - should be overridden by subclasses
        response = f"Agent {self.name} received: {input_text}"
        self.history.append({"input": input_text, "response": response})
        return response
    
    def get_history(self) -> list:
        """Get interaction history."""
        return self.history.copy()
    
    def reset(self):
        """Reset agent state."""
        self.history = []

class ChatAgent(Agent):
    """Chat-oriented agent."""
    
    def __init__(self, name: str = "chat_agent", **kwargs):
        super().__init__(name, kwargs)
        self.system_prompt = "You are a helpful assistant."
        
    def process(self, input_text: str) -> str:
        """Process chat input."""
        # Simple echo for demonstration
        response = f"{self.name}: {input_text}"
        self.history.append({"input": input_text, "response": response})
        return response

def create_agent(agent_type: str = "default", **kwargs) -> Agent:
    """Factory function to create agents."""
    if agent_type == "chat":
        return ChatAgent(**kwargs)
    else:
        return Agent(**kwargs)