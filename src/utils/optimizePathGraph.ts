import { isWithinInterval, parseISO } from 'date-fns'
import { IOptimizePaths } from './findPathsToOptimize'

import menuFlightBetweenDates from '../mocks/oportunities.json'

interface IFlight {
  departure: string
  arrival: string
  departure_date: string
  profit: number
}

// Create adjacency List
let adjacencyList = new Map()

// Add Node
function addNode(airport: string) {
  adjacencyList.set(airport, [])
}

// Add undirected edge
function addEdge(origin: string, flight: IFlight) {
  adjacencyList.get(origin).push(flight)
}

// Creating graph
export function optimizePathGraph({
  start_date,
  end_date,
}: IOptimizePaths): Map<string, IFlight[]> {
  if (adjacencyList) {
    adjacencyList = new Map()
  }
  menuFlightBetweenDates.forEach(flight => {
    const dateFormatted = parseISO(flight.departure_date)
    if (
      isWithinInterval(dateFormatted, {
        start: start_date,
        end: end_date,
      })
    ) {
      if (!adjacencyList.get(flight.departure)) {
        addNode(flight.departure)
      }

      if (!adjacencyList.get(flight.arrival)) {
        addNode(flight.arrival)
      }

      const customizeFlightData = {
        departure: flight.departure,
        arrival: flight.arrival,
        departure_date: flight.departure_date,
        profit: flight.profit
      }

      addEdge(flight.departure, customizeFlightData)
    }
  })
  return adjacencyList
}
