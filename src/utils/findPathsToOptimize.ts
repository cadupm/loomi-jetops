import { addMinutes, parseISO } from 'date-fns'
import { DefaultNamingStrategy } from 'typeorm'
// import { getFlightDuration } from './getFlightDuration'
import { IConfirmedFlights } from '../calculateRoutes/CalculateRoutesUseCase'

import aviapages from '../mocks/details.json'

export interface IOptimizePaths {
  aircraftId: string
  from: string
  to: string
  start_date: Date
  end_date: Date
}

export async function findPathsToOptimize(
  flights: IConfirmedFlights[],
): Promise<IOptimizePaths[]> {
  const paths = []

  await Promise.all(
    flights.map(async (flight, index) => {
      // Catch from Avipage API
      if (index <= flights.length - 2) {
        // Just watch until last but one
        const detailsOfFlight = aviapages.find(detail => detail.departure === flight.departure && detail.arrival === flight.arrival)
        const { flight_duration: duration, turn_around } = detailsOfFlight
        const formatted_date = addMinutes(
          parseISO(flight.departure_date),
          turn_around,
        )
        const start_date = addMinutes(formatted_date, duration)
        const end_date = parseISO(flights[index + 1].departure_date)

        const path = new Object()
        Object.assign(path, {
          aircrafId: flight.aircraftId,
          from: flight.arrival,
          to: flights[index + 1].departure,
          start_date,
          end_date,
        })

        paths.push(path)
      }
    }),
  )

  return paths
}