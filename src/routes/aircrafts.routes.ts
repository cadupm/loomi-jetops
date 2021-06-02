import { Router } from 'express'
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'

const aircraftsRoutes = Router()

aircraftsRoutes.use(ensureAuthenticated)

aircraftsRoutes.post('/', (request, response) => {
  return response.json('Created end-point to create an aircraft by user admin')
})

export { aircraftsRoutes }