const express = require('express');
const { sendApiError } = require('./apiError');

const app = express();

app.use(express.json());

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.post('/echo', (req, res) => {
  const { message } = req.body;

  if (!message) {
    return sendApiError(res, 400, 'message is required');
  }

  res.json({ message });
});

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`API listening on ${port}`);
});
