import {createFeature, createReducer, on} from '@ngrx/store';

import {lab1ProductActions, productFeatureKey} from './lab1-product.actions';
import type {ProductState} from './product.state';

export const initialProductState: ProductState = {
  products: [],
  selectedProduct: null,
  dialogLoading: false,
  averageRating: null,
  countByRating: null,
  distinctOwners: [],
  productsByUnitOfMeasure: [],
  queryParams: {},
  totalPages: 0,
  totalElements: 0,
};

export const productStore = createFeature({
  name: productFeatureKey,
  reducer: createReducer<ProductState>(
    initialProductState,
    on(
      lab1ProductActions.productsFetched,
      (state, {response}): ProductState => ({
        ...state,
        products: response.content,
        totalElements: response.page.totalElements,
        totalPages: response.page.totalPages,
        queryParams: {
          ...state.queryParams,
          page: response.page.number,
          size: response.page.size,
        },
      }),
    ),
    on(
      lab1ProductActions.queryParamsUpdated,
      (state, {queryParams}): ProductState => ({
        ...state,
        queryParams,
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
    on(
      lab1ProductActions.averageRatingFetched,
      (state, {averageRating}): ProductState => ({
        ...state,
        averageRating,
      }),
    ),
    on(
      lab1ProductActions.countByRatingFetched,
      (state, {count}): ProductState => ({
        ...state,
        countByRating: count,
      }),
    ),
    on(
      lab1ProductActions.distinctOwnersFetched,
      (state, {owners}): ProductState => ({
        ...state,
        distinctOwners: owners,
      }),
    ),
    on(
      lab1ProductActions.productsByUnitOfMeasureFetched,
      (state, {products}): ProductState => ({
        ...state,
        productsByUnitOfMeasure: products,
      }),
    ),
  ),
});
