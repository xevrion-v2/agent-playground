import { Router } from 'express';
import { sendApiError } from '../utils/apiHelpers';

const router = Router();

    // Registration logic here
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    sendApiError(res, 'Registration failed', 500, error.message);
  }
});


// Other routes remain unchanged
router.post('/login', (req, res) => {
  res.send('Login route');
});

router.get('/oauth-callback', (req, res) => {