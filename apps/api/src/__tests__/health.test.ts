import { describe, it, expect } from 'vitest'
import request from 'supertest'
import express from 'express'
import usersRouter from '../routes/users'

function createApp() {
  const app = express()
  app.use(express.json({ limit: '1mb' }))

  app.get('/health', (_req, res) => {
    res.json({
      status: 'ok',
      data: {
        service: 'taskflow-api',
      },
    })
  })

  app.use('/users', usersRouter)
  return app
}

describe('GET /health', () => {
  it('should return status 200', async () => {
    const app = createApp()
    const res = await request(app).get('/health')
    expect(res.status).toBe(200)
  })

  it('should use consistent envelope with status field', async () => {
    const app = createApp()
    const res = await request(app).get('/health')
    expect(res.body).toHaveProperty('status')
    expect(res.body.status).toBe('ok')
  })

  it('should wrap service info in data field', async () => {
    const app = createApp()
    const res = await request(app).get('/health')
    expect(res.body).toHaveProperty('data')
    expect(res.body.data).toEqual({ service: 'taskflow-api' })
  })
})
