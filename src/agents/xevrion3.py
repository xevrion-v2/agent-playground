"""
Xevrion Agent 3 - Enhanced reasoning capabilities
"""

import os
import sys
from typing import Dict, Any, Optional
import json
from datetime import datetime

from .base_agent import BaseAgent
from ..utils.logger import get_logger
from ..config import settings

logger = get_logger(__name__)


class Xevrion3Agent(BaseAgent):
    """Third generation Xevrion agent with improved reasoning"""
    
    def __init__(self, agent_id: str, config: Optional[Dict[str, Any]] = None):
        super().__init__(agent_id, config)
        
        # Load specific configuration for xevrion3
        self.reasoning_depth = self.config.get('reasoning_depth', 3)
        self.max_iterations = self.config.get('max_iterations', 10)
        self.temperature = self.config.get('temperature', 0.7)
        
        # Initialize reasoning engine
        self.reasoning_engine = None
        self._initialize_reasoning_engine()
    
    def _initialize_reasoning_engine(self):
        """Initialize the reasoning engine with configured parameters"""
        try:
            # Import here to avoid circular dependencies
            from ..reasoning.engine import ReasoningEngine
            
            self.reasoning_engine = ReasoningEngine(
                depth=self.reasoning_depth,
                max_iterations=self.max_iterations,
                temperature=self.temperature
            )
            logger.info(f"Initialized reasoning engine for {self.agent_id}")
        except ImportError as e:
            logger.error(f"Failed to import ReasoningEngine: {e}")
            raise
        except Exception as e:
            logger.error(f"Failed to initialize reasoning engine: {e}")
            raise
    
    async def process(self, input_data: Dict[str, Any]) -> Dict[str, Any]:
        """Process input using enhanced reasoning capabilities"""
        logger.info(f"Processing input with {self.agent_id}")
        
        # Validate input
        if not input_data.get('query'):
            raise ValueError("Input must contain a 'query' field")
        
        # Extract query and context
        query = input_data['query']
        context = input_data.get('context', {})
        
        # Use reasoning engine to process the query
        if self.reasoning_engine:
            try:
                result = await self.reasoning_engine.reason(
                    query=query,
                    context=context,
                    agent_id=self.agent_id
                )
                
                # Format response
                response = {
                    'agent_id': self.agent_id,
                    'timestamp': datetime.utcnow().isoformat(),
                    'query': query,
                    'result': result,
                    'metadata': {
                        'reasoning_depth': self.reasoning_depth,
                        'max_iterations': self.max_iterations,
                        'temperature': self.temperature
                    }
                }
                
                logger.info(f"Successfully processed query: {query[:50]}...")
                return response
                
            except Exception as e:
                logger.error(f"Error during reasoning: {e}")
                raise
        
        raise RuntimeError("Reasoning engine not initialized")
    
    def get_status(self) -> Dict[str, Any]:
        """Get current status of the agent"""
        return {
            'agent_id': self.agent_id,
            'status': 'active' if self.reasoning_engine else 'error',
            'config': {
                'reasoning_depth': self.reasoning_depth,
                'max_iterations': self.max_iterations,
                'temperature': self.temperature
            },
            'initialized': self.reasoning_engine is not None
        }


def create_agent(agent_id: str, config: Optional[Dict[str, Any]] = None) -> Xevrion3Agent:
    """Factory function to create a Xevrion3Agent instance"""
    return Xevrion3Agent(agent_id, config)