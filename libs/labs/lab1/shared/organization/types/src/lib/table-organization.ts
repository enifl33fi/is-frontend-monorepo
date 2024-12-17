import type {Entity} from '@is/labs/lab1/shared/types';

export interface TableOrganization extends Entity {
  officialAddressId: number;
  postalAddressId: number;
  name: string;
  annualTurnover: number;
  employeesCount: number;
  fullName: string;
  rating: number;
}
