export const UNITS_OF_MEASURES = ['CENTIMETERS', 'PCS', 'LITERS'] as const;

export type UnitOfMeasure = (typeof UNITS_OF_MEASURES)[number];
