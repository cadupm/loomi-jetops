import { Router } from 'express'
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'
import { CreateAircraftController } from '../modules/aircrafts/useCases/createAircraft/CreateAircraftController'
import { FindAircraftController } from '../modules/aircrafts/useCases/findAircraft/FindAircraftController'
import { ListAircraftsController } from '../modules/aircrafts/useCases/listAircrafts/ListAircraftsController'
import { UpdateAircraftController } from '../modules/aircrafts/useCases/updateAircraft/UpdateAircraftController'

const aircraftsRoutes = Router()

const createAircraftController = new CreateAircraftController()
const updateAircraftController = new UpdateAircraftController()
const listAircraftsController = new ListAircraftsController()
const findAircraftController = new FindAircraftController()

aircraftsRoutes.use(ensureAuthenticated)

aircraftsRoutes.post('/', createAircraftController.handle)
aircraftsRoutes.get('/', listAircraftsController.handle)
aircraftsRoutes.get('/:id', findAircraftController.handle)
aircraftsRoutes.patch('/:id', updateAircraftController.handle) 
aircraftsRoutes.delete('/:id', (request, response) => {
  return response.json({msg: 'End-point setted up'})
})

export { aircraftsRoutes }