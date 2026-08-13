"""Tests for Xevrion3 agent"""

import pytest
import asyncio
from unittest.mock import Mock, patch, AsyncMock
from src.agents.xevrion3 import Xevrion3Agent, create_agent


class TestXevrion3Agent:
    """Test cases for Xevrion3Agent"""
    
    def test_initialization(self):
        """Test agent initialization with default config"""
        agent = Xevrion3Agent("test-agent-1")
        assert agent.agent_id == "test-agent-1"
        assert agent.reasoning_depth == 3
        assert agent.max_iterations == 10
        assert agent.temperature == 0.7
    
    def test_initialization_with_custom_config(self):
        """Test agent initialization with custom configuration"""
        config = {
            'reasoning_depth': 5,
            'max_iterations': 20,
            'temperature': 0.5
        }
        agent = Xevrion3Agent("test-agent-2", config)
        assert agent.reasoning_depth == 5
        assert agent.max_iterations == 20
        assert agent.temperature == 0.5
    
    @pytest.mark.asyncio
    async def test_process_success(self):
        """Test successful processing of input"""
        # Mock the reasoning engine
        mock_result = {
            'answer': 'Test answer',
            'confidence': 0.95,
            'steps': ['step1', 'step2']
        }
        
        with patch('src.agents.xevrion3.ReasoningEngine') as MockEngine:
            mock_engine_instance = AsyncMock()
            mock_engine_instance.reason = AsyncMock(return_value=mock_result)
            MockEngine.return_value = mock_engine_instance
            
            agent = Xevrion3Agent("test-agent-3")
            
            input_data = {
                'query': 'Test query',
                'context': {'key': 'value'}
            }
            
            result = await agent.process(input_data)
            
            assert result['agent_id'] == 'test-agent-3'
            assert result['query'] == 'Test query'
            assert result['result'] == mock_result
            assert 'timestamp' in result
            assert 'metadata' in result
    
    @pytest.mark.asyncio
    async def test_process_missing_query(self):
        """Test processing with missing query field"""
        agent = Xevrion3Agent("test-agent-4")
        
        with pytest.raises(ValueError, match="Input must contain a 'query' field"):
            await agent.process({'context': {}})
    
    def test_get_status(self):
        """Test getting agent status"""
        with patch('src.agents.xevrion3.ReasoningEngine'):
            agent = Xevrion3Agent("test-agent-5")
            status = agent.get_status()
            
            assert status['agent_id'] == 'test-agent-5'
            assert status['status'] == 'active'
            assert status['initialized'] is True
            assert 'config' in status
    
    def test_create_agent_factory(self):
        """Test the factory function for creating agents"""
        agent = create_agent("factory-agent")
        assert isinstance(agent, Xevrion3Agent)
        assert agent.agent_id == "factory-agent"


if __name__ == '__main__':
    pytest.main([__file__, '-v'])