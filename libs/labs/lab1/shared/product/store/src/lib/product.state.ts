import type {Product, TableProduct} from '@is/labs/lab1/shared/product/types';
import type {EntityQueryParams} from '@is/labs/lab1/shared/types';

export interface ProductState {
  products: TableProduct[];
  selectedProduct: Product | null;
  dialogLoading: boolean;
  countOwnerLessThan: number | null;
  productsByPartNumber: TableProduct[];
  ratings: number[];
  queryParams: EntityQueryParams;
  totalElements: number;
  totalPages: number;
}
