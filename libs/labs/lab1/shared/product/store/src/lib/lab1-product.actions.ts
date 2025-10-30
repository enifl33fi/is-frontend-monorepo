import type {HttpErrorResponse} from '@angular/common/http';
import type {
  FormProduct,
  Product,
  TableProduct,
} from '@is/labs/lab1/shared/product/types';
import type {EntityQueryParams, PageResponse} from '@is/labs/lab1/shared/types';
import {createActionGroup, emptyProps, props} from '@ngrx/store';

export const productFeatureKey = 'product';

export const lab1ProductActions = createActionGroup({
  source: productFeatureKey,
  events: {
    fetchProducts: emptyProps(),
    productsFetched: props<{response: PageResponse<TableProduct>}>(),
    productRequestFailed: props<{error: HttpErrorResponse}>(),
    fetchProductById: props<{id: number}>(),
    setDialogLoading: props<{dialogLoading: boolean}>(),
    addProduct: props<{product: FormProduct}>(),
    updateProduct: props<{product: FormProduct}>(),
    deleteProduct: props<{id: number}>(),
    productByIdFetched: props<{product: Product}>(),
    addProductCompleted: props<{product: Product}>(),
    updateProductCompleted: props<{product: Product}>(),
    deleteProductCompleted: emptyProps(),
    showViewDialog: props<{id: number}>(),
    showAddDialog: emptyProps(),
    fetchOwnerCountLessThan: props<{ownerId: number}>(),
    fetchProductsByPartNumber: props<{partNumber: string}>(),
    fetchRatings: emptyProps(),
    decreasePrice: props<{manufacturerId: number; percent: number}>(),
    ownerCountLessThanFetched: props<{ownerCount: number}>(),
    productsByPartNumberFetched: props<{products: TableProduct[]}>(),
    ratingsFetched: props<{ratings: number[]}>(),
    priceDecreased: emptyProps(),

    queryParamsFetched: props<{queryParams: EntityQueryParams}>(),
    queryParamsUpdated: props<{queryParams: EntityQueryParams}>(),
  },
});
