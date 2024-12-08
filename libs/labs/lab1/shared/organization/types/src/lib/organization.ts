import type {Address} from '@is/labs/lab1/shared/address/types';
import type {Entity} from '@is/labs/lab1/shared/types';

export interface Organization extends Entity {
  officialAddress: Address;
  postalAddress: Address;
  name: string;
  annualTurnover: number;
  employeesCount: number;
  fullName: string;
  rating: number;
}
