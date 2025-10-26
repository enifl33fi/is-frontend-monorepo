export const COLORS = ['BLACK', 'BLUE', 'YELLOW', 'ORANGE', 'BROWN'] as const;

export type Color = (typeof COLORS)[number];
