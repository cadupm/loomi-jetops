import { compare } from "bcryptjs";
import { sign } from 'jsonwebtoken'

import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../errors/AppError";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  email: string
  password: string
}

interface IResponse {
  user: {
      name: string
      email: string
  },
  token: string
}


@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  async execute({ email, password }: IRequest): Promise<IResponse> { 
    const user = await this.usersRepository.findByEmail(email)

    // Check if user email exists
    if(!user) {
      throw new AppError('Email or password incorrect', 401) // throw this error to not decrease the security
    }

    const passwordMatch = await compare(password, user.password)

    // Check if password passed matchs with the hashed-password at database
    if (!passwordMatch) {
      throw new AppError('Email or password incorrect', 401)
    }

    const token = sign({}, '0adc9467ec4a9425a60de527d9cdf73e', {
      subject: user.id,
      expiresIn: '1d'
  })

    return {
      user: {
        name: user.name,
        email: user.email
      },
      token
    }
  }
}

export { AuthenticateUserUseCase }