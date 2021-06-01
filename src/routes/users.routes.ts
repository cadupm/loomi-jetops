import { Router } from 'express'
import { CreateUserController } from '../modules/users/useCases/createUser/CreateUserController'
import { DeleteUserController } from '../modules/users/useCases/deleteUser/DeleteUserController'
import { FindUserController } from '../modules/users/useCases/findUser/FindUserController'
import { ListAllUsersController } from '../modules/users/useCases/listUsers/ListAllUsersController'

const usersRoutes = Router()

const createUserController = new CreateUserController()
const listAllUsersController = new ListAllUsersController()
const findUserController = new FindUserController()
const deleteUserController = new DeleteUserController()

usersRoutes.post('/', createUserController.handle)
usersRoutes.get('/', listAllUsersController.handle)
usersRoutes.get('/:id', findUserController.handle)
usersRoutes.delete('/:id', deleteUserController.handle)


export { usersRoutes }