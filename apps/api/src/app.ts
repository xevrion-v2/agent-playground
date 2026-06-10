import express from 'express';
import cors from 'cors';
import { env } from 'process';

const app = express();

// Add request body size limit (conservative limit of 100kb for JSON payloads)
app.use(express.json({ limit: '100kb' }));
app.use(express.urlencoded({ extended: true, limit: '100kb' }));

// Add other middleware and routes...