import { Router } from 'express'
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'
import { CreateAircraftController } from '../modules/aircrafts/useCases/CreateAircraftController'

const aircraftsRoutes = Router()

const createAircraftController = new CreateAircraftController()

aircraftsRoutes.use(ensureAuthenticated)

aircraftsRoutes.post('/', createAircraftController.handle)
aircraftsRoutes.patch('/:id', (request, response) => {
  return response.json({ msg: 'End-point to update aircraft owner linked.'})
})

export { aircraftsRoutes }