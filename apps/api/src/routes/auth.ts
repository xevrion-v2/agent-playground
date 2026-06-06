import { Router } from 'express';
import { sendApiError } from '../utils/apiErrorHelper';

const router = Router();

// Example route using the error helper
  } catch (error) {
    return sendApiError(res, 'Login failed', 500);
  }
});

// Example of a route that would use our helper
router.get('/error-example', (req, res) => {
  return sendApiError(
    res, 
    'This is an example error response', 
    400,
    'EXAMPLE_ERROR'
  );
});

export default router;