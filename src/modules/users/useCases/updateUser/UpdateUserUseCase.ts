import { inject, injectable } from "tsyringe";
import { UpdateResult } from "typeorm";
import { IUsersRepository } from "../../repositories/IUsersRepository";


interface IRequest {
  id: string
  name: string
}


@injectable()
class UpdateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  async execute({ id, name }: IRequest): Promise<UpdateResult> {
    const user = await this.usersRepository.updateUser(id, name)

    return user
  }
}

export { UpdateUserUseCase }