import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { UpdateAircraftUseCase } from './UpdateAircraftUseCase'

class UpdateAircraftController {
  async handle(request: Request, response: Response) {
    const { id } = request.params
    const { name } = request.body

    const updateAircraftUseCase = container.resolve(UpdateAircraftUseCase)

    const aircraft = await updateAircraftUseCase.execute({
      id,
      name
    })

    return response.json(aircraft)
  }
}

export { UpdateAircraftController }