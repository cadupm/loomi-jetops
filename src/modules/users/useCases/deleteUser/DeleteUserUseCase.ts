import { injectable, inject } from 'tsyringe'
import { AppError } from '../../../../errors/AppError'

import { User } from '../../entities/User'
import { IUsersRepository } from '../../repositories/IUsersRepository'

interface IRequest {
  id: string
}

@injectable()
class DeleteUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute({ id }: IRequest): Promise<User[]> {
    const user = await this.usersRepository.findById(id)

    if (!user) {
      throw new AppError('User does not exist', 404)
    }

    const users = await this.usersRepository.deleteUser(id)

    return users
  }
}

export { DeleteUserUseCase }
