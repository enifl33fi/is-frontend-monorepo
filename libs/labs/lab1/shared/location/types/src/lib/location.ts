import type {Entity} from '@is/labs/lab1/shared/types';

export interface Location extends Entity {
  x: number;
  y: number;
  z: number;
  name: string;
}
