import { Router } from 'express';
import { sendApiError } from '../utils/error.helper';

const testRouter = Router();

testRouter.get('/error-test', (req: any, res: any) => {
  // This is just a simple test route to demonstrate the helper
  res.json({ message: 'This is a test endpoint' });
});

export default testRouter;