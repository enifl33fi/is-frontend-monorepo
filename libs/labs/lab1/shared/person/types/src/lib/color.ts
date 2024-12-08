export const COLORS = ['GREEN', 'RED', 'BLUE', 'BROWN'] as const;

export type Color = (typeof COLORS)[number];
