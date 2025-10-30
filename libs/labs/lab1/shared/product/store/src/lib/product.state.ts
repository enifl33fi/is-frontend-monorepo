import type {TablePerson} from '@is/labs/lab1/shared/person/types';
import type {Product, TableProduct} from '@is/labs/lab1/shared/product/types';
import type {EntityQueryParams} from '@is/labs/lab1/shared/types';

export interface ProductState {
  products: TableProduct[];
  selectedProduct: Product | null;
  dialogLoading: boolean;
  averageRating: number | null;
  countByRating: number | null;
  distinctOwners: TablePerson[];
  productsByUnitOfMeasure: TableProduct[];
  queryParams: EntityQueryParams;
  totalElements: number;
  totalPages: number;
}
