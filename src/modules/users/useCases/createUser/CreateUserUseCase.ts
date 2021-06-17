import { injectable, inject } from 'tsyringe'
import { hash } from 'bcryptjs'
import { AppError } from '../../../../errors/AppError'

import { IUsersRepository } from '../../repositories/IUsersRepository'
import { InsertQueryBuilder } from 'typeorm'

interface IRequest {
  name: string
  email: string
  password: string
}

@injectable()
class CreateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute({ name, email, password }: IRequest): Promise<void> {
    const existentUser = await this.usersRepository.findByEmail(email)

    if (existentUser) { 
      throw new AppError('User already exists!')
    }
    
    const passwordHashed = await hash(password, 8)

    await this.usersRepository.create({
      name,
      email,
      password: passwordHashed,
    })
  }
}

export { CreateUserUseCase }
