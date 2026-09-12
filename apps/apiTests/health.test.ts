    const res = await request(app).get('/health');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      status: 'success',
      data: { healthy: true },
    });
  });
});