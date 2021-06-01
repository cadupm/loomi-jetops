import { Router } from 'express'

const usersRoutes = Router()

usersRoutes.post('/', (request, response) => {
  return response.json({ msg: 'Endpoint to user route already created.'})
})

export { usersRoutes }