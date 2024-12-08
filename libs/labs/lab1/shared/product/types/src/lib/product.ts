import type {Coordinates} from '@is/labs/lab1/shared/coordinates/types';
import type {Organization} from '@is/labs/lab1/shared/organization/types';
import type {Person} from '@is/labs/lab1/shared/person/types';
import type {Entity} from '@is/labs/lab1/shared/types';

import type {UnitOfMeasure} from './unit-of-measure';

export interface Product extends Entity {
  coordinates: Coordinates;
  manufacturer: Organization;
  owner: Person;
  name: string;
  unitOfMeasure: UnitOfMeasure;
  price: number;
  manufactureCost: number;
  rating: number;
  partNumber: string;
}
