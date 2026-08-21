import piRoutes from './routes/pi.routes';
import express from 'express';
import userRoutes from './routes/user.routes';
import taskRoutes from './routes/task.routes';

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());

const routes = require('./routes');
const authRoutes = require('./routes/auth.routes');
const taskRoutes = require('./routes/task.routes');
const piRoutes = require('./routes/pi.routes');

app.use('/api', piRoutes);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`TaskFlow API listening on port ${port}`);
});
