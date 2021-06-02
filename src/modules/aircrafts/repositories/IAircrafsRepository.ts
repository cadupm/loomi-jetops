import { ICreateAircraftDTO } from "../dtos/ICreateAircraftDTO";
import { Aircraft } from "../entities/Aircraft";

interface IAircraftsRepository {
  create(data: ICreateAircraftDTO): Promise<void>
  findByName(name: string): Promise<Aircraft>
}

export { IAircraftsRepository }