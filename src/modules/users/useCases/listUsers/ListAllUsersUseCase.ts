import { injectable, inject } from 'tsyringe'
import { User } from '../../entities/User'
import { IUsersRepository } from '../../repositories/IUsersRepository'

@injectable()
class ListAllUsersUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute(): Promise<User[]> {
    return await this.usersRepository.listAllUsers()
  }
}

export { ListAllUsersUseCase }
