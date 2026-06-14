import cors from 'cors';
import helmet from 'helmet';
import healthRoutes from './routes/health.routes';
import { errorResponse } from './utils/response';

const app = express();


// 404 handler
app.use((_req, res) => {
  res.status(404).json(errorResponse('Not found'));
});

export default app;