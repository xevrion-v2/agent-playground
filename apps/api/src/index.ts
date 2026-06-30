import express from 'express';
import { usersRouter } from './routes/users';

// Import the new utility
import { promiseLikeGuard } from './utils/promiseLikeGuard';

const app = express();

app.use(express.json());

// Mount routes
app.use('/users', usersRouter);

// Example usage of the new guard (optional, but demonstrates existence)
// app.get('/health', (req, res) => {
//   const result = promiseLikeGuard(Promise.resolve('ok'));
//   res.json({ status: 'ok', result });
// });

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export { promiseLikeGuard };