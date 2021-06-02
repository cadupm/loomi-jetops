import { inject, injectable } from "tsyringe";
import { Aircraft } from "../../entities/Aircraft";
import { IAircraftsRepository } from "../../repositories/IAircrafsRepository";

interface IRequest {
  id: string
  name: string
}

@injectable()
class UpdateAircraftUseCase {
  constructor(
    @inject('AircraftsRepository')
    private aircraftsRepository: IAircraftsRepository
  ) {}

  async execute({ id, name }: IRequest): Promise<Aircraft> {
    const aircraft = await this.aircraftsRepository.findById(id)

    aircraft.name = name

    await this.aircraftsRepository.save(aircraft)

    return aircraft
  }
}

export { UpdateAircraftUseCase }