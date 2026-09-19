import express from 'express';
import cors from 'cors';
import helmet from 'helmet';

const app = express();

// Security and body parsing middleware with conservative limits
// Body size limit set to 10mb to prevent potential DoS attacks
// Issue: Add request body size limit #1
app.use(helmet());
app.use(express.json({ limit: '10mb' }));  // Conservative JSON body size limit
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cors());