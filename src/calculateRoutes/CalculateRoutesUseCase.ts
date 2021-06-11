import fs from 'fs'
import csvParse from 'csv-parse'
import { findPathsToOptimize } from '../utils/findPathsToOptimize'
import { optimizePathGraph } from '../utils/optimizePathGraph'
import { optimalDfs } from '../utils/optimalDfs'

import { IPossiblePaths } from '../utils/optimalDfs'

export interface IConfirmedFlights {
  aircraftId: string
  departure: string
  arrival: string
  departure_date: string
}

const turn_around = 60

class CalculateRoutesUseCase {
  async loadConfirmedFlights(file: Express.Multer.File): Promise<IConfirmedFlights[]> {
      return new Promise((resolve, reject) => {
      const flights: IConfirmedFlights[] = []

      const stream = fs.createReadStream(file.path)

      const parseFile = csvParse()

      stream.pipe(parseFile)

      parseFile.on('data', (line) =>{
        const [aircraftId, departure, arrival, departure_date] = line

        flights.push({
          aircraftId,
          departure,
          arrival,
          departure_date
        })
      })

      .on('end', () => {
        // console.log(flights)
        fs.promises.unlink(file.path)
        resolve(flights)
      })

      .on('error', (err) => {
        reject(err)
    })
  })
}

  async execute(aircraftId, file): Promise<IPossiblePaths[]> {
    const allconfirmedFlights = await this.loadConfirmedFlights(file)
    const specificAircraftconfirmedFlights = allconfirmedFlights.filter((flight) => flight.aircraftId === aircraftId)
  
    const pathsToOptimize = await findPathsToOptimize(specificAircraftconfirmedFlights)

    const possiblePaths = await Promise.all(pathsToOptimize.map(path => {
      const graph = optimizePathGraph(path)
      return optimalDfs(graph, path.from, path.to, path.start_date, path.end_date)
    }))
    return possiblePaths
  }
}

export { CalculateRoutesUseCase }

