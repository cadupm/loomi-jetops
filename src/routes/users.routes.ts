import { Router } from 'express'
import { CreateUserController } from '../modules/users/useCases/createUser/CreateUserController'
import { ListAllUsersController } from '../modules/users/useCases/listUsers/ListAllUsersController'

const usersRoutes = Router()

const createUserController = new CreateUserController()
const listAllUsersController = new ListAllUsersController()

usersRoutes.post('/', createUserController.handle)
usersRoutes.get('/', listAllUsersController.handle)
usersRoutes.get('/:id', (request, response) => {
  return response.json({ msg: 'End-point connected to find an user.'})
})

export { usersRoutes }