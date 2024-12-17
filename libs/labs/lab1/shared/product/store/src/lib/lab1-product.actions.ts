import type {HttpErrorResponse} from '@angular/common/http';
import type {TableProduct} from '@is/labs/lab1/shared/product/types';
import {createActionGroup, emptyProps, props} from '@ngrx/store';

export const productFeatureKey = 'product';

export const lab1ProductActions = createActionGroup({
  source: productFeatureKey,
  events: {
    fetchProducts: emptyProps(),
    productsFetched: props<{products: TableProduct[]}>(),
    productFetchFailed: props<{error: HttpErrorResponse}>(),
  },
});
