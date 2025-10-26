export const COUNTRIES = ['VATICAN', 'THAILAND', 'JAPAN'] as const;

export type Country = (typeof COUNTRIES)[number];
