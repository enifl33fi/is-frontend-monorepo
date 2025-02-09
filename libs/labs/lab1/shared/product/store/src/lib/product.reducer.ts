import {createFeature, createReducer, on} from '@ngrx/store';

import {lab1ProductActions, productFeatureKey} from './lab1-product.actions';
import type {ProductState} from './product.state';

export const initialProductState: ProductState = {
  products: [],
  selectedProduct: null,
  dialogLoading: false,
};

export const productStore = createFeature({
  name: productFeatureKey,
  reducer: createReducer<ProductState>(
    initialProductState,
    on(
      lab1ProductActions.productsFetched,
      (state, {products}): ProductState => ({
        ...state,
        products,
      }),
    ),
    on(
      lab1ProductActions.setDialogLoading,
      (state, {dialogLoading}): ProductState => ({
        ...state,
        dialogLoading,
      }),
    ),
    on(
      lab1ProductActions.addProduct,
      lab1ProductActions.updateProduct,
      (state): ProductState => ({
        ...state,
        dialogLoading: true,
      }),
    ),
    on(
      lab1ProductActions.addProductCompleted,
      lab1ProductActions.updateProductCompleted,
      (state, {product}): ProductState => ({
        ...state,
        dialogLoading: false,
        selectedProduct: product,
      }),
    ),
    on(
      lab1ProductActions.productByIdFetched,
      (state, {product}): ProductState => ({
        ...state,
        selectedProduct: product,
      }),
    ),
    on(
      lab1ProductActions.productRequestFailed,
      (state): ProductState => ({
        ...state,
        dialogLoading: false,
      }),
    ),
    on(
      lab1ProductActions.showAddDialog,
      (state): ProductState => ({
        ...state,
        selectedProduct: null,
      }),
    ),
  ),
});
