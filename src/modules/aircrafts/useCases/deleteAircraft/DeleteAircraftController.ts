import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { DeleteAircraftUseCase } from './DeleteAircraftUseCase'

class DeleteAircraftController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params

    const deleteAircraftUseCase = container.resolve(DeleteAircraftUseCase)

    const remainingAircrafts = await deleteAircraftUseCase.execute({
      id
    })

    return response.json(remainingAircrafts)
  }
}

export { DeleteAircraftController }