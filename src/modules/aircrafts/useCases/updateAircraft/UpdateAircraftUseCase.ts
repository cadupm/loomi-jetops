import { inject, injectable } from 'tsyringe'
import { AppError } from '../../../../errors/AppError'
import { Aircraft } from '../../entities/Aircraft'
import { IAircraftsRepository } from '../../repositories/IAircrafsRepository'

interface IRequest {
  id: string
  name: string
}

@injectable()
class UpdateAircraftUseCase {
  constructor(
    @inject('AircraftsRepository')
    private aircraftsRepository: IAircraftsRepository,
  ) {}

  async execute({ id, name }: IRequest): Promise<Aircraft> {
    const aircraft = await this.aircraftsRepository.findById(id)

    if (!aircraft) {
      throw new AppError('Aicraft does not exist', 404)
    }

    aircraft.name = name
    aircraft.updated_at = new Date()

    await this.aircraftsRepository.save(aircraft)

    return aircraft
  }
}

export { UpdateAircraftUseCase }
