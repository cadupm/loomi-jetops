import axios from 'axios'

export async function getFlightDuration(departure_airport: string, arrival_airport: string): Promise<number> {
  const response = await axios.post(`${process.env.AVIAPAGES_API_URL}/flight_calculator/`, {
    departure_airport: departure_airport,
    arrival_airport: arrival_airport,
    aircraft: "Embraer Legacy 650",
    pax: 2,
    airway_time: true
    },
    {
      headers: { 
        Authorization: `Token ${process.env.AVIAPAGES_API_KEY}`
      }
    })

    const { airway: duration } = response.data.time
  
    return duration
}