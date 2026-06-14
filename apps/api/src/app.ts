import express from 'express';
import { json } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { routes } from './routes';
const app = express();

app.use(helmet());
app.use(json({ limit: '100kb' }));
app.use(cors());

app.use('/api', routes);