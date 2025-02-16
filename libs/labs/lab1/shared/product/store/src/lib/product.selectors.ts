import {productStore} from './product.reducer';

export const {
  selectProducts,
  selectDialogLoading,
  selectSelectedProduct,
  selectRatings,
  selectProductsByPartNumber,
  selectCountOwnerLessThan,
} = productStore;
