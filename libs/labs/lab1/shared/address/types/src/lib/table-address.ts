import type {Entity} from '@is/labs/lab1/shared/types';

export interface TableAddress extends Entity {
  zipCode: string;
  townId: number;
}
