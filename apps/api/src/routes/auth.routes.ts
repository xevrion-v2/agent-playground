import { sendApiError } from '../utils/errorHelper';
import express from 'express';
import { register, login, refresh } from '../controllers/auth.controller';
import { validateRegister, validateLogin } from '../middleware/validation.middleware';
    register
  )
  .post(
    '/login', 
    validateLogin, 
    login
  );
    try {
      // Original route logic would go here
      // For demonstration, adding a simple error case
      if (!req.body.email) {
        return sendApiError(res, 'Email is required', 'MISSING_EMAIL', 400);
      }
      
      // Original login logic would continue here...
      login(req, res, next);
    } catch (error) {
      sendApiError(res, 'Login failed', 'LOGIN_ERROR', 500);
    }
  );