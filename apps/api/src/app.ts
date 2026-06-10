import express from 'express';
import cors from 'cors';
import { json, urlencoded } from 'body-parser';

const app = express();

// Configure JSON body size limit
app.use(json({ limit: '10mb' })); // Set conservative JSON body size limit
app.use(urlencoded({ extended: true, limit: '10mb' }));

// Existing middleware and routes would continue here...