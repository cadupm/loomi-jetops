import { Router } from 'express'
import { CreateUserController } from '../modules/users/useCases/createUser/CreateUserController'

const usersRoutes = Router()

const createUserController = new CreateUserController()

usersRoutes.post('/', createUserController.handle)
usersRoutes.get('/', (request, response) => {
  return response.json({ msg: 'Link to end-point list users is done'})
})

export { usersRoutes }