export const ORGANIZATION_TYPES = [
  'COMMERCIAL',
  'PUBLIC',
  'PRIVATE_LIMITED_COMPANY',
  'OPEN_JOINT_STOCK_COMPANY',
];

export type OrganizationType = (typeof ORGANIZATION_TYPES)[number];
