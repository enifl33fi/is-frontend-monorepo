import {createFeature, createReducer, on} from '@ngrx/store';

import {lab1ProductActions, productFeatureKey} from './lab1-product.actions';
import type {ProductState} from './product.state';

export const initialProductState: ProductState = {
  products: [],
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
  ),
});
