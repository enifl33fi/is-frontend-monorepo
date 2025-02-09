import type {Entity, FormEntity} from '@is/labs/lab1/shared/types';

import type {UnitOfMeasure} from './unit-of-measure';

export interface ProductData {
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

export interface TableProduct extends Entity, ProductData {}

export interface FormProduct
  extends FormEntity,
    ProductData,
    Partial<Omit<Entity, 'hasAccess'>> {}
