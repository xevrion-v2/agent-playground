import { Agent } from '../src/agent';
import { Message, MessageType } from '../src/types';

describe('Agent', () => {
  let agent: Agent;

  beforeEach(() => {
    agent = new Agent();
  });

  test('should add messages correctly', () => {
    const message: Message = {
      type: MessageType.USER,
      content: 'Hello, world!'
    };

    agent.addMessage(message);
    const messages = agent.getMessages();

    expect(messages).toHaveLength(1);
    expect(messages[0]).toEqual(message);
  });

  test('should handle max history limit', () => {
    const agentWithLimit = new Agent(2);
    
    for (let i = 0; i < 3; i++) {
      agentWithLimit.addMessage({
        type: MessageType.USER,
        content: `Message ${i}`
      });
    }

    const messages = agentWithLimit.getMessages();
    expect(messages).toHaveLength(2);
    expect(messages[0].content).toBe('Message 1');
    expect(messages[1].content).toBe('Message 2');
  });

  test('should validate message types', () => {
    const invalidMessage = {
      type: 'INVALID_TYPE',
      content: 'Test'
    };

    expect(() => {
      agent.addMessage(invalidMessage as Message);
    }).toThrow('Invalid message type: INVALID_TYPE');
  });

  test('should convert non-string content to string', () => {
    const messageWithNumber: Message = {
      type: MessageType.USER,
      content: 123 as any
    };

    agent.addMessage(messageWithNumber);
    const messages = agent.getMessages();
    
    expect(typeof messages[0].content).toBe('string');
    expect(messages[0].content).toBe('123');
  });

  test('should process different message types', () => {
    const userMessage: Message = {
      type: MessageType.USER,
      content: 'Hello'
    };

    const agentMessage: Message = {
      type: MessageType.AGENT,
      content: 'Hi there'
    };

    const systemMessage: Message = {
      type: MessageType.SYSTEM,
      content: 'System update'
    };

    expect(agent.processMessage(userMessage)).toBe('Processing user message: Hello');
    expect(agent.processMessage(agentMessage)).toBe('Processing agent message: Hi there');
    expect(agent.processMessage(systemMessage)).toBe('Processing system message: System update');
  });

  test('should clear messages', () => {
    agent.addMessage({
      type: MessageType.USER,
      content: 'Test message'
    });

    expect(agent.getMessages()).toHaveLength(1);
    
    agent.clearMessages();
    expect(agent.getMessages()).toHaveLength(0);
  });
});