import { Router } from 'express';
import { apiError } from '../utils/apiError';

const router = Router();

// Example route using the error helper
router.get('/example-error', () => {
  throw apiError('This is a sample error', 400, ['Sample error detail']);
});

// If there are existing routes, we would modify one to use our new helper
// This is just an example of how it would be used
export default router;

export { router as exampleRouter };