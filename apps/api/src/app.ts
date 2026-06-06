import express from 'express';
import { json } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { routes } from './routes';
app.use(helmet());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(json({ limit: '100kb' }));

app.use('/api', routes);


Each app/package expects its own .env values for DB, auth, 
and integrations.

## API Limits

- JSON request body size limit: **100 KB**

## AI Agent Contribution Instruction