export const TABS = [
  'product',
  'coordinates',
  'organization',
  'person',
  'address',
  'location',
] as const;

export type Tab = (typeof TABS)[number];
