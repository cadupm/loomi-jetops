import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { DeleteUserUseCase } from './DeleteUserUseCase'

class DeleteUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { id } = request.params

      const deleteUserUseCase = container.resolve(DeleteUserUseCase)

      const users = await deleteUserUseCase.execute({
        id
      })

      return response.json(users)
    } catch(err) {
      return response.status(404).json({ err: err.message })
    }
  }

}

export { DeleteUserController }