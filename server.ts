import express from 'express';
import bodyParser from 'body-parser';

const app = express();

// Configure a conservative JSON body size limit of 10MB
app.use(bodyParser.json({ limit: '10mb' }));

// ... rest of your Express app configuration