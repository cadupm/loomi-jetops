import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { FindUserUseCase } from './FindUserUseCase'

class FindUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { user_id } = request.params

      const findUserUseCase = container.resolve(FindUserUseCase)

      const user = await findUserUseCase.execute({
        user_id
      })

      return response.json(user)
    } catch(err) {
      return response.status(404).json({ err: err.message })
    }
  }
}

export { FindUserController }