app.use(express.json());

app.get('/health', (_req, res) => {
  res.json({
    status: 'success',
    data: { ok: true }
  });
});

app.use('/api', routes);