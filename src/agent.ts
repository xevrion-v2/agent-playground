import { Agent } from './core/agent';
import { TaskManager } from './core/task-manager';
import { Logger } from './utils/logger';

export class PlaygroundAgent {
  private agent: Agent;
  private taskManager: TaskManager;
  private logger: Logger;

  constructor() {
    this.agent = new Agent();
    this.taskManager = new TaskManager();
    this.logger = new Logger();
  }

  async run(task: string): Promise<string> {
    try {
      this.logger.info(`Starting task: ${task}`);
      const result = await this.agent.execute(task);
      this.logger.info(`Task completed: ${result}`);
      return result;
    } catch (error) {
      this.logger.error(`Task failed: ${error}`);
      throw error;
    }
  }
}