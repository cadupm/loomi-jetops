import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { FindAircraftUseCase } from './FindAircraftUseCase'

class FindAircraftController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params

    const findAircraftUseCase = container.resolve(FindAircraftUseCase)

    const aircraft = await findAircraftUseCase.execute({
      id,
    })

    return response.json(aircraft)
  }
}

export { FindAircraftController }
