import { Router } from 'express'
import { usersRoutes } from './users.routes'
import { authRoutes } from './auth.routes'

const routes = Router()

routes.use('/user', usersRoutes)
routes.use('/auth', authRoutes)

export { routes }