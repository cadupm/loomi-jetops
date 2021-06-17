import { UpdateResult } from 'typeorm'
import { User } from '../entities/User'
import { ICreateUserDTO } from '../dtos/ICreateUserDTO'

interface IUsersRepository {
  create(data: ICreateUserDTO): Promise<void>
  findByEmail(email: string): Promise<User>
  listAllUsers(): Promise<User[]>
  findById(id: string): Promise<User>
  deleteUser(id: string): Promise<User[]>
  updateUser(id: string, name: string): Promise<UpdateResult>
}

export { IUsersRepository }
