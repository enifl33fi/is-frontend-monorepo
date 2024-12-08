export const COUNTRIES = ['FRANCE', 'INDIA', 'ITALY', 'SOUTH_KOREA'] as const;

export type Country = (typeof COUNTRIES)[number];
