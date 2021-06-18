import { Router } from 'express'
// import multer from 'multer'
// import multerConfig from '../config/upload'

import { CalculateRoutesController } from '../calculateRoutes/CalculateRoutesController'

const calculateRoutes = Router()

const calculateRoutesController = new CalculateRoutesController()

//const upload = multer(multerConfig)

calculateRoutes.get(
  '/:aircraftId',
  //upload.single('file'),
  calculateRoutesController.handle,
)

export { calculateRoutes }
