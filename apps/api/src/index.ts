import express from 'express';
import { json, urlencoded } from 'body-parser';

const app = express();
const PORT = process.env.PORT || 3001;

// Configure body parser with size limits
app.use(json({ limit: '10mb' }));
app.use(urlencoded({ limit: '10mb', extended: true }));

app.get('/', (req, res) => {
  res.send('TaskFlow API');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.use("/users", usersRouter);

app.listen(port, () => {
  console.log(`TaskFlow API listening on port ${port}`);
});
