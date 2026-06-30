import express from 'express';
import { urlJoin } from './utils/url';
import usersRouter from './routes/users';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Example usage of the new helper (can be removed or kept as demo)
app.get('/health', (req, res) => {
  const healthPath = urlJoin('/api', 'v1', 'health');
  res.json({ status: 'ok', path: healthPath });
});

app.use('/users', usersRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;