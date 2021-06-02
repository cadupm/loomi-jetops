import { Router } from 'express'
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'
import { CreateAircraftController } from '../modules/aircrafts/useCases/createAircraft/CreateAircraftController'
import { UpdateAircraftController } from '../modules/aircrafts/useCases/updateAircraft/UpdateAircraftController'

const aircraftsRoutes = Router()

const createAircraftController = new CreateAircraftController()
const updateAircraftController = new UpdateAircraftController()

aircraftsRoutes.use(ensureAuthenticated)

aircraftsRoutes.post('/', createAircraftController.handle)
aircraftsRoutes.get('/', (request, response) => {
  return response.json({ msg: 'End-point connected to list all aircrafts'})
})
aircraftsRoutes.patch('/:id', updateAircraftController.handle) 

export { aircraftsRoutes }