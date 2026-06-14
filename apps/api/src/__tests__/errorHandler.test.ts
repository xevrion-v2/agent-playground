import { describe, it, expect } from 'vitest'
import request from 'supertest'
import express from 'express'
import usersRouter from '../routes/users'
import { errorHandler, apiError, asyncHandler } from '../middleware/errorHandler'

function createApp() {
  const app = express()
  app.use(express.json())
  app.use('/users', usersRouter)
  app.use(errorHandler)
  return app
}

describe('Error handler middleware', () => {
  it('should return 500 for unknown errors', async () => {
    const app = express()
    app.get('/boom', () => {
      throw new Error('something broke')
    })
    app.use(errorHandler)

    const res = await request(app).get('/boom')
    expect(res.status).toBe(500)
    expect(res.body.error.message).toBe('Internal server error')
  })

  it('should handle apiError with custom status and message', async () => {
    const app = express()
    app.get('/not-found', (_req, _res, next) => {
      next(apiError(404, 'Resource not found', { id: '123' }))
    })
    app.use(errorHandler)

    const res = await request(app).get('/not-found')
    expect(res.status).toBe(404)
    expect(res.body.error.message).toBe('Resource not found')
    expect(res.body.error.details).toEqual({ id: '123' })
  })

  it('should handle apiError without details', async () => {
    const app = express()
    app.get('/bad-request', (_req, _res, next) => {
      next(apiError(400, 'Bad request'))
    })
    app.use(errorHandler)

    const res = await request(app).get('/bad-request')
    expect(res.status).toBe(400)
    expect(res.body.error.message).toBe('Bad request')
    expect(res.body.error.details).toBeUndefined()
  })

  it('should work with asyncHandler', async () => {
    const app = express()
    app.get('/async-ok', asyncHandler(async (_req, res) => {
      res.json({ ok: true })
    }))
    app.get('/async-err', asyncHandler(async () => {
      throw apiError(503, 'Service unavailable')
    }))
    app.use(errorHandler)

    const ok = await request(app).get('/async-ok')
    expect(ok.status).toBe(200)

    const err = await request(app).get('/async-err')
    expect(err.status).toBe(503)
    expect(err.body.error.message).toBe('Service unavailable')
  })
})

describe('POST /users validation (uses error helper)', () => {
  it('should return 400 when body is empty', async () => {
    const app = createApp()
    const res = await request(app)
      .post('/users')
      .send({})
    expect(res.status).toBe(400)
    expect(res.body.error.message).toContain('required')
  })

  it('should return 201 with valid body', async () => {
    const app = createApp()
    const res = await request(app)
      .post('/users')
      .send({ name: 'test' })
    expect(res.status).toBe(201)
    expect(res.body.data.id).toBe('stub-user-id')
  })
})
