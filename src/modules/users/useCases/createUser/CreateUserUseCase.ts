import { injectable, inject } from "tsyringe";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { hash } from 'bcryptjs'

interface IRequest {
  name: string
  email: string
  password: string
}

@injectable()
class CreateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  async execute({ name, email, password }: IRequest): Promise<void> {
    const existentUser = await this.usersRepository.findByEmail(email)

    if(existentUser) {
      throw new Error('User already exists!')
    }

    const passwordHashed = await hash(password, 8)

    await this.usersRepository.create({
      name,
      email,
      password: passwordHashed
    })
  }
}

export { CreateUserUseCase }