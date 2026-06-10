import { Router } from 'express';
import { apiError } from '../utils/apiError';

const router = Router();

    // ... validation logic
  } catch (error) {
    console.error(error);
    return apiError(res, 'Internal server error', 500, error);
  }
});
