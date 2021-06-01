import { injectable, inject } from "tsyringe";

import { User } from "../../entities/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  id : string
}

@injectable()
class DeleteUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  async execute({ id }: IRequest): Promise<User[]> {
    const users = await this.usersRepository.deleteUser(id)

    return users
  }
}

export { DeleteUserUseCase }