import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CalculateRoutesUseCase } from './CalculateRoutesUseCase'

class CalculateRoutesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { file } = request
    const { aircraftId } = request.params

    const calculateRoutesUseCase = container.resolve(CalculateRoutesUseCase)

    const calculateRoutes = await calculateRoutesUseCase.execute(
      aircraftId,
      file
    )
    return response.json(calculateRoutes)
  }
}


export { CalculateRoutesController }