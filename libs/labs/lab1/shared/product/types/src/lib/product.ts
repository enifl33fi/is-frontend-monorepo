import type {Coordinates} from '@is/labs/lab1/shared/coordinates/types';
import type {Organization} from '@is/labs/lab1/shared/organization/types';
import type {Person} from '@is/labs/lab1/shared/person/types';
import type {Entity} from '@is/labs/lab1/shared/types';

import type {UnitOfMeasure} from './unit-of-measure';

export interface ProductBase {
  name: string;
  unitOfMeasure: UnitOfMeasure;
  price: number;
  manufactureCost: number;
  rating: number;
  creationDate: string;
}

export interface Product extends Entity, ProductBase {
  coordinates: Coordinates;
  manufacturer: Organization | null;
  owner: Person | null;
}
