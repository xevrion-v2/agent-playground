import { Router } from 'express';

const router = Router();

// GET /users - List all users
router.get('/', (req, res) => {
  res.status(200).json({
    users: []
  });
});

// POST /users - Create a new user
router.post('/', (req, res) => {
  const { name, email } = req.body;
  
  // Generate a simple mock ID
  const id = Math.random().toString(36).substring(2, 15);
  
  const newUser = {
    id,
    name: name || '',
    email: email || ''
  };
  
  res.status(201).json(newUser);
});

export default router;