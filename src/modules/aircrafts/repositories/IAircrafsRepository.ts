import { ICreateAircraftDTO } from "../dtos/ICreateAircraftDTO";
import { Aircraft } from "../entities/Aircraft";

interface IAircraftsRepository {
  create(data: ICreateAircraftDTO): Promise<void>
  findByName(name: string): Promise<Aircraft>
  findById(id: string): Promise<Aircraft>
  save(aircraft: Aircraft): Promise<void>
  listAllAircrafts(): Promise<Aircraft[]>
}

export { IAircraftsRepository }