import { getRepository, Repository } from "typeorm";
import { ICreateAircraftDTO } from '../../dtos/ICreateAircraftDTO'
import { Aircraft } from "../../entities/Aircraft";
import { IAircraftsRepository } from "../IAircrafsRepository";

class AircraftsRepository implements IAircraftsRepository {
  private repository: Repository<Aircraft>

  constructor() {
    this.repository = getRepository(Aircraft)
  }

  async create({ name, type}: ICreateAircraftDTO): Promise<void> {
    const aircraft = this.repository.create({
      name, 
      type
    })

    await this.repository.save(aircraft)
  }

  async findByName(name: string): Promise<Aircraft> {
    const aircraft = this.repository.findOne({ name })

    return aircraft
  }

  async findById(id: string): Promise<Aircraft> {
    const aircraft = this.repository.findOne(id)

    return aircraft
  }

  async save(aircraft: Aircraft): Promise<void> {
    await this.repository.save(aircraft)
  }

  async listAllAircrafts(): Promise<Aircraft[]> {
    return this.repository.find()
  }
}

export { AircraftsRepository }