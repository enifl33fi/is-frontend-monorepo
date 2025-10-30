import type {HttpErrorResponse} from '@angular/common/http';
import type {TablePerson} from '@is/labs/lab1/shared/person/types';
import type {
  FormProduct,
  Product,
  TableProduct,
  UnitOfMeasure,
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
    fetchAverageRating: emptyProps(),
    averageRatingFetched: props<{averageRating: number}>(),

    fetchCountByRating: props<{rating: number}>(),
    countByRatingFetched: props<{count: number}>(),

    fetchDistinctOwners: emptyProps(),
    distinctOwnersFetched: props<{owners: TablePerson[]}>(),

    fetchProductsByUnitOfMeasure: props<{unitOfMeasures: UnitOfMeasure[]}>(),
    productsByUnitOfMeasureFetched: props<{products: TableProduct[]}>(),

    decreaseAllPrices: props<{percent: number}>(),
    allPricesDecreased: emptyProps(),

    queryParamsFetched: props<{queryParams: EntityQueryParams}>(),
    queryParamsUpdated: props<{queryParams: EntityQueryParams}>(),
  },
});
