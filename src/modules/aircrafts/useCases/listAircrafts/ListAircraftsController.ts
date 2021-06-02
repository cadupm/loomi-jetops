import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { ListAircraftsUseCase } from './ListAircraftsUseCase'

class ListAircraftsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listAircraftsUseCase = container.resolve(ListAircraftsUseCase)

    const aircrafts = await listAircraftsUseCase.execute()

    return response.json(aircrafts)
  }
}

export { ListAircraftsController }