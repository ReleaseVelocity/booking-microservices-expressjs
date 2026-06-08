import { Channel } from 'amqplib';

interface FlightData {
  flightId: number;
  flightNumber: string;
  departureAirportId: number;
  arriveAirportId: number;
  departureDate: string;
  arriveDate: string;
  price: number;
  category: string;
}

export async function publishFlightCreatedEvent(
  channel: Channel,
  flightData: FlightData
): Promise<void> {
  const exchange = 'flight-exchange';
  const routingKey = 'flight.created';

  const eventPayload = {
    flightId: flightData.flightId,
    flightNumber: flightData.flightNumber,
    departureAirportId: flightData.departureAirportId,
    arriveAirportId: flightData.arriveAirportId,
    departureDate: flightData.departureDate,
    arriveDate: flightData.arriveDate,
    price: flightData.price,
    // category: flightData.category,  // BUG: MISSING from event payload
  };

  channel.publish(exchange, routingKey, Buffer.from(JSON.stringify(eventPayload)), { persistent: true });
}
