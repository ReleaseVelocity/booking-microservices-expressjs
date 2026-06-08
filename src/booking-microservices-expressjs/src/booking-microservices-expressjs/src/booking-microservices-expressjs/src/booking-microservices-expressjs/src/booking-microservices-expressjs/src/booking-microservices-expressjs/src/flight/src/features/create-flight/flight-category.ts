export enum FlightCategory {
  Economy = 'Economy',
  Business = 'Business',
  First = 'First',
}

export function validateCategory(category: string): boolean {
  return Object.values(FlightCategory).includes(category as FlightCategory);
}
