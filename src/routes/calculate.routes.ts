import { Router } from 'express'

const calculateRoutes = Router()

calculateRoutes.get('/:id', (request, response) => {
  return response.json({msg: 'Calculate optimus route set up'})
})

export { calculateRoutes }