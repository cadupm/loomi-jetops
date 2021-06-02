import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase'

class AuthenticateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { email, password } = request.body
      const authenticateUserUseCase = container.resolve(AuthenticateUserUseCase)

      const token = await authenticateUserUseCase.execute({
        email,
        password
      })

      return response.json(token)
    } catch(err) {
      return response.status(401).json({ err: err.message })
    }
  }
}

export { AuthenticateUserController }