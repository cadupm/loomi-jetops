// import fs from 'fs'
// import csvParse from 'csv-parse'
import { findPathsToOptimize } from '../utils/findPathsToOptimize'
import { optimizePathGraph } from '../utils/optimizePathGraph'
import { optimalDfs, IPossiblePaths } from '../utils/optimalDfs'

import confirmedFlights from '../mocks/confirmedFlights.json'

export interface IConfirmedFlights {
  aircraftId: string
  departure: string
  arrival: string
  departure_date: string
}

// const turn_around = 60

class CalculateRoutesUseCase {
  /* async loadConfirmedFlights(
    file: Express.Multer.File,
  ): Promise<IConfirmedFlights[]> {
    return new Promise((resolve, reject) => {
      const flights: IConfirmedFlights[] = []

      const stream = fs.createReadStream(file.path)

      const parseFile = csvParse()

      stream.pipe(parseFile)

      parseFile
        .on('data', line => {
          const [aircraftId, departure, arrival, departure_date] = line

          flights.push({
            aircraftId,
            departure,
            arrival,
            departure_date,
          })
        })

        .on('end', () => {
          // console.log(flights)
          fs.promises.unlink(file.path)
          resolve(flights)
        })

        .on('error', err => {
          reject(err)
        })
    })
  } */

  async execute(aircraftId: string): Promise<IPossiblePaths[]> {
    const specificAircraftConfirmedFlights = confirmedFlights.filter(
      flight => flight.aircraftId === aircraftId,
    )

    const pathsToOptimize = await findPathsToOptimize(
      specificAircraftConfirmedFlights,
    )

    // console.log(pathsToOptimize)

    const possiblePaths = await Promise.all(
      pathsToOptimize.map(path => {
        const graph = optimizePathGraph(path)
        // console.log(graph)
        return optimalDfs(
          graph,
          path.from,
          path.to,
          path.start_date,
          path.end_date,
        )
      }),
    )
    return possiblePaths
  }
}

export { CalculateRoutesUseCase }
