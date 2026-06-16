import { Message, MessageType } from './types';

export class Agent {
  private messages: Message[] = [];
  private maxHistory: number;

  constructor(maxHistory: number = 100) {
    this.maxHistory = maxHistory;
  }

  addMessage(message: Message): void {
    if (this.messages.length >= this.maxHistory) {
      this.messages.shift();
    }
    
    // Validate message type
    if (!Object.values(MessageType).includes(message.type)) {
      throw new Error(`Invalid message type: ${message.type}`);
    }
    
    // Ensure content is properly formatted
    if (message.content && typeof message.content !== 'string') {
      message.content = String(message.content);
    }
    
    this.messages.push(message);
  }

  getMessages(): Message[] {
    return [...this.messages];
  }

  clearMessages(): void {
    this.messages = [];
  }

  processMessage(message: Message): string {
    this.addMessage(message);
    
    // Handle different message types
    switch (message.type) {
      case MessageType.USER:
        return this.handleUserMessage(message);
      case MessageType.AGENT:
        return this.handleAgentMessage(message);
      case MessageType.SYSTEM:
        return this.handleSystemMessage(message);
      default:
        return `Unknown message type: ${message.type}`;
    }
  }

  private handleUserMessage(message: Message): string {
    return `Processing user message: ${message.content}`;
  }

  private handleAgentMessage(message: Message): string {
    return `Processing agent message: ${message.content}`;
  }

  private handleSystemMessage(message: Message): string {
    return `Processing system message: ${message.content}`;
  }
}