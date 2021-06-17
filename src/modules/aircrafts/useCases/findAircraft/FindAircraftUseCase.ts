import { inject, injectable } from 'tsyringe'
import { AppError } from '../../../../errors/AppError'
import { Aircraft } from '../../entities/Aircraft'
import { IAircraftsRepository } from '../../repositories/IAircrafsRepository'

interface IRequest {
  id: string
}

@injectable()
class FindAircraftUseCase {
  constructor(
    @inject('AircraftsRepository')
    private aircraftsRepository: IAircraftsRepository,
  ) {}

  async execute({ id }: IRequest): Promise<Aircraft> {
    const user = await this.aircraftsRepository.findById(id)

    if (!user) {
      throw new AppError('Aircraft does not exist', 404)
    }

    return user
  }
}

export { FindAircraftUseCase }
