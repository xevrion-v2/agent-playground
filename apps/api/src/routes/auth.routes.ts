import { sendApiError } from '../utils/apiHelpers';

// Example usage in one of the auth routes
app.post('/example-error-route', (req, res) => {
  try {
    // Some logic that might fail
    throw new Error('Example error');
  } catch (error) {
    sendApiError(res, error.message, 400);
  }
});