import { describe, it, expect } from 'vitest'
import request from 'supertest'
import express from 'express'
import usersRouter from '../routes/users'

function createApp() {
  const app = express()
  app.use(express.json())
  app.use('/users', usersRouter)
  return app
}

describe('GET /users', () => {
  it('should return status 200', async () => {
    const app = createApp()
    const res = await request(app).get('/users')
    expect(res.status).toBe(200)
  })

  it('should return JSON content type', async () => {
    const app = createApp()
    const res = await request(app).get('/users')
    expect(res.headers['content-type']).toMatch(/json/)
  })

  it('should return empty data array', async () => {
    const app = createApp()
    const res = await request(app).get('/users')
    expect(res.body.data).toEqual([])
  })

  it('should include a message about not being implemented', async () => {
    const app = createApp()
    const res = await request(app).get('/users')
    expect(res.body.message).toContain('not implemented')
  })
})

describe('POST /users', () => {
  it('should return status 201', async () => {
    const app = createApp()
    const res = await request(app)
      .post('/users')
      .send({ name: 'test' })
    expect(res.status).toBe(201)
  })

  it('should return a stub user id', async () => {
    const app = createApp()
    const res = await request(app)
      .post('/users')
      .send({ name: 'test' })
    expect(res.body.data.id).toBe('stub-user-id')
  })

  it('should include request body in response', async () => {
    const app = createApp()
    const res = await request(app)
      .post('/users')
      .send({ name: 'Alice', role: 'admin' })
    expect(res.body.data.name).toBe('Alice')
    expect(res.body.data.role).toBe('admin')
  })

  it('should include a message about not being implemented', async () => {
    const app = createApp()
    const res = await request(app)
      .post('/users')
      .send({})
    expect(res.body.message).toContain('not implemented')
  })
})
