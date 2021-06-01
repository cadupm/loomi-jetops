import { Router } from 'express'
import { CreateUserController } from '../modules/users/useCases/createUser/CreateUserController'
import { FindUserController } from '../modules/users/useCases/findUser/FindUserController'
import { ListAllUsersController } from '../modules/users/useCases/listUsers/ListAllUsersController'

const usersRoutes = Router()

const createUserController = new CreateUserController()
const listAllUsersController = new ListAllUsersController()
const findUserController = new FindUserController()

usersRoutes.post('/', createUserController.handle)
usersRoutes.get('/', listAllUsersController.handle)
usersRoutes.get('/:user_id', findUserController.handle)

export { usersRoutes }