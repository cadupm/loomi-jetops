import { addMinutes, isAfter, parseISO } from 'date-fns'
import { v4 } from 'uuid'
// import { getFlightDuration } from './getFlightDuration'
import aviapages from '../mocks/details.json'

interface IFlight {
  departure: string
  arrival: string
  departure_date: string
  profit: number
}

export interface IPossiblePaths {
  id: string
  paths: IFlight[][]
}

// const turn_around = 60

async function optimalDfs(
  graph: Map<string, IFlight[]>,
  start: string,
  end: string,
  start_date: Date,
  end_date: Date,
  path = [],
  paths = [],
): Promise<IPossiblePaths> {
  const currentPath = Array.from(path)

  const flights = graph.get(start)

  for (const flight of flights) {
    path = Array.from(currentPath)
    const detailsOfFlight = aviapages.find(detail => detail.departure === flight.departure && detail.arrival === flight.arrival)
    const { flight_duration: duration, turn_around} = detailsOfFlight
    // const duration = await getFlightDuration(flight.departure, flight.arrival)
    const addingWaitingTime = addMinutes(
      parseISO(flight.departure_date),
      turn_around,
    )
    const calculatedNewStartDate = addMinutes(addingWaitingTime, duration)

    const isValidFlight =
      isAfter(parseISO(flight.departure_date), start_date) &&
      isAfter(end_date, calculatedNewStartDate)

    if (isValidFlight) {
      path.push(flight)
      // console.log(start, parseISO(flight.departure_date), flight.arrival, calculatedNewStartDate)

      if (flight.arrival === end) {
        paths.push(path)
      }

      optimalDfs(
        graph,
        flight.arrival,
        end,
        calculatedNewStartDate,
        end_date,
        path,
        paths,
      )
    }
  }

  return {
    id: v4(),
    paths,
  }
}

export { optimalDfs }
