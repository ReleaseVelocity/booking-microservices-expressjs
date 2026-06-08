import { describe, it, expect } from '@jest/globals';

describe('Flight Event Consumer - Booking Service', () => {
  function parseFlightCreatedEvent(payload: any) {
    return {
      flightId: payload.flightId,
      flightNumber: payload.flightNumber,
      departureAirportId: payload.departureAirportId,
      arriveAirportId: payload.arriveAirportId,
      departureDate: payload.departureDate,
      arriveDate: payload.arriveDate,
      price: payload.price,
      category: payload.category,
    };
  }

  it('should process flight-created event with all required fields including category', () => {
    const eventPayload = {
      flightId: 1,
      flightNumber: 'BD-450',
      departureAirportId: 1,
      arriveAirportId: 2,
      departureDate: '2026-07-01T10:00:00Z',
      arriveDate: '2026-07-01T14:00:00Z',
      price: 350,
      category: 'Economy',
    };
    const parsed = parseFlightCreatedEvent(eventPayload);
    expect(parsed.flightId).toBeDefined();
    expect(parsed.category).toBeDefined();
    expect(['Economy', 'Business', 'First']).toContain(parsed.category);
  });

  it('should reject flight-created events missing category field', () => {
    const incompletePayload = {
      flightId: 1,
      flightNumber: 'BD-450',
      departureAirportId: 1,
      arriveAirportId: 2,
      departureDate: '2026-07-01T10:00:00Z',
      arriveDate: '2026-07-01T14:00:00Z',
      price: 350,
    };
    const parsed = parseFlightCreatedEvent(incompletePayload);
    expect(parsed.category).toBeDefined();
  });
});
