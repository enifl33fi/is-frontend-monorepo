import type {Product, TableProduct} from '@is/labs/lab1/shared/product/types';

export interface ProductState {
  products: TableProduct[];
  selectedProduct: Product | null;
  dialogLoading: boolean;
  countOwnerLessThan: number | null;
  productsByPartNumber: TableProduct[];
  ratings: number[];
}
