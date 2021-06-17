import { Router } from 'express'
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'

import { CreateUserController } from '../modules/users/useCases/createUser/CreateUserController'
import { DeleteUserController } from '../modules/users/useCases/deleteUser/DeleteUserController'
import { FindUserController } from '../modules/users/useCases/findUser/FindUserController'
import { ListAllUsersController } from '../modules/users/useCases/listUsers/ListAllUsersController'
import { UpdateUserController } from '../modules/users/useCases/updateUser/UpdateUserController'

const usersRoutes = Router()

const createUserController = new CreateUserController()
const listAllUsersController = new ListAllUsersController()
const findUserController = new FindUserController()
const deleteUserController = new DeleteUserController()
const updateUserController = new UpdateUserController()

usersRoutes.post('/', createUserController.handle)
usersRoutes.get('/', listAllUsersController.handle)
usersRoutes.get('/:id', findUserController.handle)
usersRoutes.delete('/:id', ensureAuthenticated, deleteUserController.handle)
usersRoutes.patch('/', ensureAuthenticated, updateUserController.handle)

export { usersRoutes }
