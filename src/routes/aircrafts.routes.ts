import { Router } from 'express'
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'
import { CreateAircraftController } from '../modules/aircrafts/useCases/CreateAircraftController'

const aircraftsRoutes = Router()

const createAircraftController = new CreateAircraftController()

aircraftsRoutes.use(ensureAuthenticated)

aircraftsRoutes.post('/', createAircraftController.handle)

export { aircraftsRoutes }