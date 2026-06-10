import express from 'express';
import { json } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

const app = express();
const port = process.env.PORT || 4000;

const PORT = process.env.PORT || 3001;

app.use(cors());
// JSON body size limit: 100 KB (conservative limit to prevent abuse)
app.use(json({ limit: '100kb' }));

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });

app.listen(port, () => {
  console.log(`TaskFlow API listening on port ${port}`);
});
