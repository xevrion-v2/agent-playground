import { sendApiError } from '../utils/errorHelper';
import { register, login, refresh } from '../controllers/auth.controller';
import { validateRegister, validateLogin } from '../middleware/validation.middleware';
import { authRouter } from '../middleware/auth.middleware';
  .post(
    '/login',
    validateLogin,
    (req, res, next) => {
      try {
        login(req, res, next);
      } catch (error) {
        sendApiError(
          res,
          'An error occurred during login',
          'LOGIN_ERROR',
          500
        );
      }
    }
  );