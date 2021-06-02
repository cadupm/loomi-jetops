import { ICreateAircraftDTO } from "../dtos/ICreateAircraftDTO";

interface IAircraftsRepository {
  create(data: ICreateAircraftDTO): Promise<void>
}

export { IAircraftsRepository }