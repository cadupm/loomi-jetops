import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { UpdateUserUseCase } from './UpdateUserUseCase'


class UpdateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.user
    const { name } = request.body

    const updateUserUseCase = container.resolve(UpdateUserUseCase)

    const { raw: user_data } = await updateUserUseCase.execute({
      id,
      name
    })

    const user = user_data[0]
    
    return response.json(user)
  }
}

export { UpdateUserController }