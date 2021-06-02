import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../errors/AppError";
import { Aircraft } from "../../entities/Aircraft";
import { IAircraftsRepository } from "../../repositories/IAircrafsRepository";

interface IRequest {
  id: string
}

@injectable()
class DeleteAircraftUseCase {
  constructor(
    @inject('AircraftsRepository')
    private aircraftsRepository: IAircraftsRepository
  ) {}

  async execute({ id }: IRequest): Promise<Aircraft[]> {
    const aircraft = await this.aircraftsRepository.findById(id)

    if (!aircraft) {
      throw new AppError('Aircraft does not exist', 404)
    }

    return await this.aircraftsRepository.delete(id)
  }
}

export { DeleteAircraftUseCase }