import { Router } from 'express';
import { UserService } from '../services/user.service';
import { validateUser } from '../validators/user.validator';

const router = Router();
const userService = new UserService();

// Get all users
router.get('/', async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get user by ID
router.get('/:id', async (req, res) => {
  try {
    const user = await userService.getUserById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create user
router.post('/', validateUser, async (req, res) => {
  try {
    const user = await userService.createUser(req.body);
    res.status(201).json(user);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update user
router.put('/:id', validateUser, async (req, res) => {
  try {
    const user = await userService.updateUser(req.params.id, req.body);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete user
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await userService.deleteUser(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;