import { Router } from 'express';
import { sendSuccess } from '../utils/response';

const router = Router();

router.get('/', (req, res) => {
  return res.status(200).json({
    status: 'success',
    data: {
      message: 'OK'
    }
  });
});

router.get('/error', (req, res) => {
  return res.status(500).json({
    status: 'error',
    data: {
      message: 'Internal Server Error'
    }
  });
});