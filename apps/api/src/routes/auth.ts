import { Router } from 'express';
import { APIError } from '../utils/apiError';
import { sendErrorResponse } from '../utils/apiError';

const router = Router();

  } catch (error) {
    console.error('Registration error:', error);
    const apiError = new APIError('Registration failed', 500);
    sendErrorResponse(res, apiError);
  }
});