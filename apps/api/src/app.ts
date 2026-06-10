import express from 'express';
import { configureBodyParser } from './middleware/bodyParser';

const app = express();

// Configure body parser with size limits
configureBodyParser(app);

// Additional configuration...

export default app;