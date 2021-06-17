import { inject, injectable } from 'tsyringe'
import { AppError } from '../../../../errors/AppError'
import { IAircraftsRepository } from '../../repositories/IAircrafsRepository'

interface IRequest {
  name: string
  type: string
}

@injectable()
class CreateAircraftUseCase {
  constructor(
    @inject('AircraftsRepository')
    private aircraftsRepository: IAircraftsRepository,
  ) {}

  async execute({ name, type }: IRequest): Promise<void> {
    const existentAircraft = await this.aircraftsRepository.findByName(name)

    if (existentAircraft) {
      throw new AppError('Aircraft already exists')
    }

    await this.aircraftsRepository.create({
      name,
      type,
    })
  }
}

export { CreateAircraftUseCase }
