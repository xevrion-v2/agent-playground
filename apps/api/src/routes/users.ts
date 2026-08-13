import { Router } from 'express'
import { apiError } from '../middleware/errorHandler'

const router = Router()

router.get('/', (_req, res) => {
  res.json({
    data: [],
    message: 'User listing is not implemented yet.',
  })
})

router.post('/', (req, res) => {
  // Demonstrate error helper: validate required fields
  if (!req.body || Object.keys(req.body).length === 0) {
    const err = apiError(400, 'Request body is required')
    res.status(err.status).json({ error: { message: err.message } })
    return
  }

  res.status(201).json({
    data: {
      id: 'stub-user-id',
      ...req.body,
    },
    message: 'User creation is not implemented yet.',
  })
})

export default router
