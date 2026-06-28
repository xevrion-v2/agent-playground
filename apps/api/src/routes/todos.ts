import { Router } from 'express';
const router = Router();

interface Todo {
  id: string;
  title: string;
  completed: boolean;
  createdAt: string;
}

let todos: Todo[] = [];

router.get('/', (_req, res) => {
  res.json({ data: todos, total: todos.length });
});

router.post('/', (req, res) => {
  const todo: Todo = {
    id: Math.random().toString(36).substring(7),
    title: req.body.title || 'Untitled',
    completed: false,
    createdAt: new Date().toISOString()
  };
  todos.push(todo);
  res.status(201).json({ data: todo });
});

export default router;
