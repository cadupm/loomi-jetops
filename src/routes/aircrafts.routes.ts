import { Router } from 'express'
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'
import { CreateAircraftController } from '../modules/aircrafts/useCases/createAircraft/CreateAircraftController'
import { DeleteAircraftController } from '../modules/aircrafts/useCases/deleteAircraft/DeleteAircraftController'
import { FindAircraftController } from '../modules/aircrafts/useCases/findAircraft/FindAircraftController'
import { ListAircraftsController } from '../modules/aircrafts/useCases/listAircrafts/ListAircraftsController'
import { UpdateAircraftController } from '../modules/aircrafts/useCases/updateAircraft/UpdateAircraftController'

const aircraftsRoutes = Router()

const createAircraftController = new CreateAircraftController()
const updateAircraftController = new UpdateAircraftController()
const listAircraftsController = new ListAircraftsController()
const findAircraftController = new FindAircraftController()
const deleteAircraftController = new DeleteAircraftController()

aircraftsRoutes.use(ensureAuthenticated)

aircraftsRoutes.post('/', createAircraftController.handle)
aircraftsRoutes.get('/', listAircraftsController.handle)
aircraftsRoutes.get('/:id', findAircraftController.handle)
aircraftsRoutes.patch('/:id', updateAircraftController.handle) 
aircraftsRoutes.delete('/:id', deleteAircraftController.handle)


export { aircraftsRoutes }