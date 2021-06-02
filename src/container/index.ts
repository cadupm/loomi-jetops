import { container } from 'tsyringe'
import { IAircraftsRepository } from '../modules/aircrafts/repositories/IAircrafsRepository'
import { AircraftsRepository } from '../modules/aircrafts/repositories/implementations/AircraftsRepository'
import { UsersRepository } from '../modules/users/repositories/implementations/UsersRepository'
import { IUsersRepository } from '../modules/users/repositories/IUsersRepository'

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository
)

container.registerSingleton<IAircraftsRepository>(
  'AircraftsRepository',
  AircraftsRepository
)