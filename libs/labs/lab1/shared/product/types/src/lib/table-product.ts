import type {Entity} from '@is/labs/lab1/shared/types';

import type {UnitOfMeasure} from './unit-of-measure';

export interface TableProduct extends Entity {
  coordinatesId: number;
  manufacturerId: number;
  ownerId: number;
  name: string;
  unitOfMeasure: UnitOfMeasure;
  price: number;
  manufactureCost: number;
  rating: number;
  partNumber: string;
}
