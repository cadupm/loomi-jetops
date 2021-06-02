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

    // everyone can list, so we cannot show the users hashed-password
    // users.map(user => delete user.password)

    return users
  }

  async findById(id: string): Promise<User> {
    const user = await this.repository.findOne(id)
    
    // everyone can list it, so we cannot show the user hashed-password
    // delete user.password

    return user
  }

  async deleteUser(id: string): Promise<User[]> {
    await this.repository.delete(id)

    return await this.listAllUsers()
  }

}

export { UsersRepository }