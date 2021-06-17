import { inject, injectable } from 'tsyringe'
import { Aircraft } from '../../entities/Aircraft'
import { IAircraftsRepository } from '../../repositories/IAircrafsRepository'

@injectable()
class ListAircraftsUseCase {
  constructor(
    @inject('AircraftsRepository')
    private aircraftsRepository: IAircraftsRepository,
  ) {}

  async execute(): Promise<Aircraft[]> {
    const aircrafts = await this.aircraftsRepository.listAllAircrafts()

    return aircrafts
  }
}

export { ListAircraftsUseCase }
