import { Router } from 'express'

const usersRoutes = Router()

usersRoutes.post('/', (request, response) => {
  return response.json({ msg: 'User end-point already created!'})
})

export { usersRoutes }