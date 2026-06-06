import { sendApiError } from '../utils/apiErrorHelper';

// Example of using the error helper in a route
// This is a simplified example - in a real route file you might have:
// router.get('/example', (req, res) => sendApiError(res, 'Something went wrong', 404));