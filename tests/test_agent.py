import unittest
from src.agent import Agent, ChatAgent, create_agent

class TestAgent(unittest.TestCase):
    
    def test_agent_creation(self):
        agent = Agent(name="test_agent")
        self.assertEqual(agent.name, "test_agent")
        self.assertEqual(agent.history, [])
        
    def test_agent_process(self):
        agent = Agent()
        response = agent.process("Hello")
        self.assertIn("received: Hello", response)
        self.assertEqual(len(agent.history), 1)
        
    def test_chat_agent(self):
        agent = ChatAgent(name="test_chat")
        response = agent.process("Hi there")
        self.assertIn("test_chat: Hi there", response)
        
    def test_create_agent_factory(self):
        agent1 = create_agent("default", name="factory_agent")
        self.assertIsInstance(agent1, Agent)
        
        agent2 = create_agent("chat", name="factory_chat")
        self.assertIsInstance(agent2, ChatAgent)
        
    def test_agent_reset(self):
        agent = Agent()
        agent.process("Test")
        self.assertEqual(len(agent.history), 1)
        agent.reset()
        self.assertEqual(len(agent.history), 0)

if __name__ == '__main__':
    unittest.main()