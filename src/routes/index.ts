import { Router } from 'express'
import { usersRoutes } from './users.routes'
import { authRoutes } from './auth.routes'
import { aircraftsRoutes } from './aircrafts.routes'

const routes = Router()

routes.use('/user', usersRoutes)
routes.use('/aircraft', aircraftsRoutes)
routes.use('/auth', authRoutes)

export { routes }