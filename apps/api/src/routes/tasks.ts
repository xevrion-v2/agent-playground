import { Router, Request, Response, NextFunction } from 'express';
import { taskService } from '../services/taskService';
import { sendError, AppError } from '../utils/errorHandler';

const router = Router();

  try {
    const tasks = await taskService.getAllTasks();
    if (!tasks || tasks.length === 0) {
      return sendError(res, 404, 'TASKS_NOT_FOUND', 'No tasks found');
    }
    return res.json({ success: true, data: tasks });
  } catch (error) {
  try {
    const task = await taskService.getTaskById(req.params.id);
    if (!task) {
      return sendError(res, 404, 'TASK_NOT_FOUND', 'Task not found');
    }
    return res.json({ success: true, data: task });
  } catch (error) {
  try {
    const task = await taskService.createTask(req.body);
    if (!task) {
      return sendError(res, 400, 'TASK_CREATE_FAILED', 'Failed to create task');
    }
    return res.status(201).json({ success: true, data: task });
  } catch (error) {
  try {
    const task = await taskService.updateTask(req.params.id, req.body);
    if (!task) {
      return sendError(res, 404, 'TASK_NOT_FOUND', 'Task not found');
    }
    return res.json({ success: true, data: task });
  } catch (error) {
  try {
    const deleted = await taskService.deleteTask(req.params.id);
    if (!deleted) {
      return sendError(res, 404, 'TASK_NOT_FOUND', 'Task not found');
    }
    return res.json({ success: true, message: 'Task deleted successfully' });
  } catch (error) {