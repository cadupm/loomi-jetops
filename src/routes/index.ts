import { Router } from 'express'
import { usersRoutes } from './users.routes'
import { authRoutes } from './auth.routes'
import { aircraftsRoutes } from './aircrafts.routes'
import { calculateRoutes } from './calculate.routes'

const routes = Router()

routes.use('/user', usersRoutes)
routes.use('/aircraft', aircraftsRoutes)
routes.use('/auth', authRoutes)
routes.use('/calculate', calculateRoutes)

export { routes }