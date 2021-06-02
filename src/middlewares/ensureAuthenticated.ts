import { Request, Response, NextFunction } from 'express'
import { verify } from 'jsonwebtoken'
import { AppError } from '../errors/AppError'

import { UsersRepository } from '../modules/users/repositories/implementations/UsersRepository'

interface IPayload {
  sub: string
}

async function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
  const authHeader = request.headers.authorization

  if (!authHeader) {
    throw new AppError('Missing token', 401)
  }

  const [, token] = authHeader.split(' ')

  try {
    const { sub: user_id } = verify(token, '0adc9467ec4a9425a60de527d9cdf73e') as IPayload

    const usersRepository = new UsersRepository()
    const user = await usersRepository.findById(user_id)

    if(!user) {
      throw new AppError('User does not exist', 401)
    }

    request.user = {
      id: user_id
    }

    next()
  } catch {
    throw new AppError('Invalid token', 401)
  }
}

export { ensureAuthenticated }