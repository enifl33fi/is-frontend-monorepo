export const UNITS_OF_MEASURES = [
  'METERS',
  'CENTIMETERS',
  'SQUARE_METERS',
  'GRAMS',
  'MILLIGRAMS',
] as const;

export type UnitOfMeasure = (typeof UNITS_OF_MEASURES)[number];
