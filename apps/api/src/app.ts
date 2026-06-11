app.use(express.json());

app.get('/health', (_req, res) => {
  res.json({
    status: 'success',
    data: { healthy: true }
  });
});

app.use('/api', routes);