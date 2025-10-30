import type {Entity, FormEntity} from '@is/labs/lab1/shared/types';

import type {ProductBase} from './product';

export interface ProductData extends ProductBase {
  coordinatesId: number;
  manufacturerId: number | null;
  ownerId: number | null;
}

export interface TableProduct extends Entity, ProductData {}

export interface FormProduct
  extends FormEntity,
    Omit<ProductData, 'creationDate'>,
    Partial<Omit<Entity, 'hasAccess'>> {}
