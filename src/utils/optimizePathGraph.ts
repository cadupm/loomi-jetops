import { isWithinInterval, parseISO } from "date-fns"
import { IOptimizePaths } from './findPathsToOptimize'

interface IFlight {
  departure: string,
  arrival: string,
  departure_date: string,
  profit: number
}


// Recrut from avinode API the response for all flights between available dates: Simulation
const menuFlightBetweenDates = [
  { departure: 'UUWW', arrival: 'EVRA', departure_date: '2021-04-21 08:00:00', profit: 4000},
  { departure: 'EVRA', arrival: 'LUKK', departure_date: '2021-04-21 14:00:00', profit: 4500 },
  { departure: 'EDDH', arrival: 'LUKK', departure_date: '2021-04-21 22:00:00', profit: 4500 },
  { departure: 'UUWW', arrival: 'LUKK', departure_date: '2021-04-22 06:30:00', profit: 5000 },
  { departure: 'EDDH', arrival: 'EVRA', departure_date: '2021-04-21 15:00:00', profit: 5000 },
  { departure: 'UUWW', arrival: 'LUKK', departure_date: '2021-04-21 23:00:00', profit: 5000 },
  { departure: 'LUKK', arrival: 'UUWW', departure_date: '2021-04-21 14:00:00', profit: 5000 },
  { departure: 'LUKK', arrival: 'EVRA', departure_date: '2021-04-21 13:00:00', profit: 5000 },
  { departure: 'EVRA', arrival: 'EDDH', departure_date: '2021-04-21 13:00:00', profit: 5000 },
  { departure: 'EVRA', arrival: 'UUWW', departure_date: '2021-04-21 13:00:00', profit: 5000 },
  { departure: 'EVRA', arrival: 'UUWW', departure_date: '2021-04-21 14:00:00', profit: 5000 },
  { departure: 'EVRA', arrival: 'UUWW', departure_date: '2021-04-21 17:00:00', profit: 5000 },

]
const adjacencyList = new Map()

// Add Node
function addNode(airport: string) {
  adjacencyList.set(airport, [])
}

// Add undirected edge
function addEdge(origin:string, flight: IFlight) {
  adjacencyList.get(origin).push(flight)
}


// Creating graph
export function optimizePathGraph({aircraftId, to, from, start_date, end_date}: IOptimizePaths): Map<string, IFlight[]> {
  menuFlightBetweenDates.forEach(flight => {
    const dateFormatted = parseISO(flight.departure_date)
    if(isWithinInterval(dateFormatted, {
      start: start_date,
      end: end_date
    })) {
      if (!adjacencyList.get(flight.departure)) { 
        addNode(flight.departure)
      }

      if(!adjacencyList.get(flight.arrival)) {
        addNode(flight.arrival)
      }
        addEdge(flight.departure, flight)  
    }
  })
  return adjacencyList
}
