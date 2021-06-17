import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CreateAircraftUseCase } from './CreateAircraftUseCase'

class CreateAircraftController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, type } = request.body

    const createAircraftUseCase = container.resolve(CreateAircraftUseCase)

    await createAircraftUseCase.execute({
      name,
      type,
    })

    return response.status(201).send()
  }
}

export { CreateAircraftController }
