import express from 'express';
import userRoutes from './routes/user.routes';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/users', userRoutes);

export default app;
