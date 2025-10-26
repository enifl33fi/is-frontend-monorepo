import type {Address} from '@is/labs/lab1/shared/address/types';
import type {Entity} from '@is/labs/lab1/shared/types';

import type {OrganizationType} from './organization-type';

export interface OrganizationBase {
  name: string;
  annualTurnover: number | null;
  employeesCount: number;
  rating: number;
  type: OrganizationType;
}

export interface Organization extends Entity, OrganizationBase {
  officialAddress: Address;
}
