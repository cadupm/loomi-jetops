import { getRepository, Repository } from "typeorm";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { User } from "../../entities/User";
import { IUsersRepository } from "../IUsersRepository";

class UsersRepository implements IUsersRepository {
  private repository: Repository<User>

  constructor() {
    this.repository = getRepository(User)
  }

  async create({ name, email, password }: ICreateUserDTO): Promise<void> {
    const user = this.repository.create({
      name,
      email,
      password
    })

    await this.repository.save(user)
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.repository.findOne({ email})

    return user
  }

  async listAllUsers(): Promise<User[]> {
    const users = await this.repository.find()

    return users
  }

  async findById(id: string): Promise<User> {
    const user = await this.repository.findOne(id)

    return user
  }

  async deleteUser(id: string): Promise<User[]> {
    await this.repository.delete(id)

    return await this.listAllUsers()
  }

}

export { UsersRepository }