import { Router } from 'express'

const authRoutes = Router()

authRoutes.post('/', (request, response) => {
  return response.json({ msg: 'Auth end-point created!'})
})

export { authRoutes }