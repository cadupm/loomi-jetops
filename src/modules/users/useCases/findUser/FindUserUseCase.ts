import { injectable, inject } from "tsyringe";

import { User } from "../../entities/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";


interface IRequest {
  user_id: string
}

@injectable()
class FindUserUseCase { 
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  async execute({ user_id }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id)

    if(!user) {
      throw new Error('User is not found!')
    } 

    return user
  }
}

export { FindUserUseCase }