import type {HttpErrorResponse} from '@angular/common/http';
import {inject, INJECTOR} from '@angular/core';
import {lab1CoordinatesActions} from '@is/labs/lab1/shared/coordinates/store';
import {lab1OrganizationActions} from '@is/labs/lab1/shared/organization/store';
import {lab1PersonActions} from '@is/labs/lab1/shared/person/store';
import {ProductService} from '@is/labs/lab1/shared/product/data-access';
import {lab1ProductActions, selectQueryParams} from '@is/labs/lab1/shared/product/store';
import type {ProductDialogContext} from '@is/labs/lab1/shared/product/ui';
import {ProductDialogComponent} from '@is/labs/lab1/shared/product/ui';
import {lab1RootActions} from '@is/labs/lab1/shared/root/store';
import type {ErrorResponse} from '@is/labs/lab1/shared/types';
import {selectAccessToken} from '@is/labs/lab1/shared/user/store';
import {objectCompareFn} from '@is/labs/lab1/shared/utils';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {concatLatestFrom} from '@ngrx/operators';
import {Store} from '@ngrx/store';
import {TuiDialogService} from '@taiga-ui/core';
import {PolymorpheusComponent} from '@taiga-ui/polymorpheus';
import {
  asyncScheduler,
  catchError,
  filter,
  map,
  observeOn,
  of,
  switchMap,
  take,
  tap,
} from 'rxjs';

export const updateQuery$ = createEffect(
  (actions$ = inject(Actions), store$ = inject(Store)) => {
    return actions$.pipe(
      ofType(lab1ProductActions.queryParamsFetched),
      concatLatestFrom(() => [store$.select(selectQueryParams)]),
      filter(
        ([{queryParams}, previousQueryParams]) =>
          !objectCompareFn(queryParams, previousQueryParams),
      ),
      map(([{queryParams}]) => lab1ProductActions.queryParamsUpdated({queryParams})),
    );
  },
  {
    functional: true,
  },
);

export const productInitialFetch$ = createEffect(
  (actions$ = inject(Actions)) => {
    return actions$.pipe(
      ofType(lab1ProductActions.queryParamsUpdated),
      map(() => lab1ProductActions.fetchProducts()),
    );
  },
  {
    functional: true,
  },
);

export const fetchProducts$ = createEffect(
  (
    actions$ = inject(Actions),
    store$ = inject(Store),
    productService = inject(ProductService),
  ) => {
    return actions$.pipe(
      ofType(lab1ProductActions.fetchProducts),
      concatLatestFrom(() => [store$.select(selectQueryParams)]),
      switchMap(([, queryParams]) => {
        return productService.getAllProducts(queryParams).pipe(
          map((response) => lab1ProductActions.productsFetched({response})),
          catchError((error: unknown) =>
            of(
              lab1ProductActions.productRequestFailed({
                error: error as HttpErrorResponse,
              }),
            ),
          ),
        );
      }),
    );
  },
  {
    functional: true,
  },
);

export const wsConnect$ = createEffect(
  (
    actions$ = inject(Actions),
    store$ = inject(Store),
    productService = inject(ProductService),
  ) => {
    return actions$.pipe(
      ofType(lab1ProductActions.fetchProducts),
      concatLatestFrom(() => [store$.select(selectAccessToken)]),
      filter(([, accessToken]) => !!accessToken),
      take(1),
      tap(([, accessToken]) => productService.wsConnect(accessToken ?? '')),
    );
  },
  {
    functional: true,
    dispatch: false,
  },
);

export const fetchProductById$ = createEffect(
  (actions$ = inject(Actions), productService = inject(ProductService)) => {
    return actions$.pipe(
      ofType(lab1ProductActions.fetchProductById),
      switchMap(({id}) => {
        return productService.getProduct(id).pipe(
          map((product) => lab1ProductActions.productByIdFetched({product})),
          catchError((error: unknown) =>
            of(
              lab1ProductActions.productRequestFailed({
                error: error as HttpErrorResponse,
              }),
            ),
          ),
        );
      }),
    );
  },
  {
    functional: true,
  },
);

export const addProduct$ = createEffect(
  (actions$ = inject(Actions), productService = inject(ProductService)) => {
    return actions$.pipe(
      ofType(lab1ProductActions.addProduct),
      switchMap(({product}) => {
        return productService.addProduct(product).pipe(
          map((product) => lab1ProductActions.addProductCompleted({product})),
          catchError((error: unknown) =>
            of(
              lab1ProductActions.productRequestFailed({
                error: error as HttpErrorResponse,
              }),
            ),
          ),
        );
      }),
    );
  },
  {
    functional: true,
  },
);

export const updateOrganization$ = createEffect(
  (actions$ = inject(Actions), productService = inject(ProductService)) => {
    return actions$.pipe(
      ofType(lab1ProductActions.updateProduct),
      switchMap(({product}) => {
        return productService.updateProduct(product).pipe(
          map((product) => lab1ProductActions.updateProductCompleted({product})),
          catchError((error: unknown) =>
            of(
              lab1ProductActions.productRequestFailed({
                error: error as HttpErrorResponse,
              }),
            ),
          ),
        );
      }),
    );
  },
  {
    functional: true,
  },
);

export const deleteProduct$ = createEffect(
  (actions$ = inject(Actions), productService = inject(ProductService)) => {
    return actions$.pipe(
      ofType(lab1ProductActions.deleteProduct),
      switchMap(({id}) => {
        return productService.deleteProduct(id).pipe(
          map(() => lab1ProductActions.deleteProductCompleted()),
          catchError((error: unknown) =>
            of(
              lab1ProductActions.productRequestFailed({
                error: error as HttpErrorResponse,
              }),
            ),
          ),
        );
      }),
    );
  },
  {
    functional: true,
  },
);

export const showSuccessAlert$ = createEffect(
  (actions$ = inject(Actions)) => {
    return actions$.pipe(
      ofType(
        lab1ProductActions.addProductCompleted,
        lab1ProductActions.updateProductCompleted,
        lab1ProductActions.deleteProductCompleted,
      ),
      map(() =>
        lab1RootActions.showAlert({
          data: {
            title: 'Success',
            description: 'Request completed',
            type: 'success',
          },
        }),
      ),
    );
  },
  {
    functional: true,
  },
);

export const fetchViewDialogData$ = createEffect(
  (actions$ = inject(Actions)) => {
    return actions$.pipe(
      ofType(lab1ProductActions.showViewDialog),
      switchMap(({id}) => {
        return [
          lab1ProductActions.fetchProductById({id}),
          lab1CoordinatesActions.fetchOwnCoordinatesIds(),
          lab1PersonActions.fetchOwnPersonIds(),
          lab1OrganizationActions.fetchOwnOrganizationIds(),
        ];
      }),
    );
  },
  {
    functional: true,
  },
);

export const fetchAddDialogData$ = createEffect(
  (actions$ = inject(Actions)) => {
    return actions$.pipe(
      ofType(lab1ProductActions.showAddDialog),
      switchMap(() => [
        lab1CoordinatesActions.fetchOwnCoordinatesIds(),
        lab1PersonActions.fetchOwnPersonIds(),
        lab1OrganizationActions.fetchOwnOrganizationIds(),
      ]),
    );
  },
  {
    functional: true,
  },
);

export const showViewDialog$ = createEffect(
  (
    actions$ = inject(Actions),
    dialogs = inject(TuiDialogService),
    injector = inject(INJECTOR),
  ) => {
    return actions$.pipe(
      ofType(lab1ProductActions.showViewDialog),
      observeOn(asyncScheduler),
      switchMap(() => {
        return dialogs.open<ProductDialogContext>(
          new PolymorpheusComponent(ProductDialogComponent, injector),
          {
            closeable: false,
            dismissible: false,
            size: 'm',
            data: {
              locked: true,
            },
          },
        );
      }),
    );
  },
  {
    functional: true,
    dispatch: false,
  },
);

export const showAddDialog$ = createEffect(
  (
    actions$ = inject(Actions),
    dialogs = inject(TuiDialogService),
    injector = inject(INJECTOR),
  ) => {
    return actions$.pipe(
      ofType(lab1ProductActions.showAddDialog),
      switchMap(() => {
        return dialogs.open<ProductDialogContext>(
          new PolymorpheusComponent(ProductDialogComponent, injector),
          {
            closeable: false,
            dismissible: false,
            size: 'm',
            data: {
              locked: false,
            },
          },
        );
      }),
    );
  },
  {
    functional: true,
    dispatch: false,
  },
);

export const showErrorAlert$ = createEffect(
  (actions$ = inject(Actions)) => {
    return actions$.pipe(
      ofType(lab1ProductActions.productRequestFailed),
      map(({error}) =>
        lab1RootActions.showHttpErrorAlert({
          error: (error.error as ErrorResponse) ?? error,
        }),
      ),
    );
  },
  {functional: true},
);

export const fetchAverageRating$ = createEffect(
  (actions$ = inject(Actions), productService = inject(ProductService)) => {
    return actions$.pipe(
      ofType(lab1ProductActions.fetchAverageRating),
      switchMap(() => {
        return productService.getAverageRating().pipe(
          map((averageRating) =>
            lab1ProductActions.averageRatingFetched({averageRating}),
          ),
          catchError((error: unknown) =>
            of(
              lab1ProductActions.productRequestFailed({
                error: error as HttpErrorResponse,
              }),
            ),
          ),
        );
      }),
    );
  },
  {
    functional: true,
  },
);

export const fetchCountByRating$ = createEffect(
  (actions$ = inject(Actions), productService = inject(ProductService)) => {
    return actions$.pipe(
      ofType(lab1ProductActions.fetchCountByRating),
      switchMap(({rating}) => {
        return productService.countByRating(rating).pipe(
          map((count) => lab1ProductActions.countByRatingFetched({count})),
          catchError((error: unknown) =>
            of(
              lab1ProductActions.productRequestFailed({
                error: error as HttpErrorResponse,
              }),
            ),
          ),
        );
      }),
    );
  },
  {
    functional: true,
  },
);

export const fetchDistinctOwners$ = createEffect(
  (actions$ = inject(Actions), productService = inject(ProductService)) => {
    return actions$.pipe(
      ofType(lab1ProductActions.fetchDistinctOwners),
      switchMap(() => {
        return productService.getDistinctOwners().pipe(
          map((owners) => lab1ProductActions.distinctOwnersFetched({owners})),
          catchError((error: unknown) =>
            of(
              lab1ProductActions.productRequestFailed({
                error: error as HttpErrorResponse,
              }),
            ),
          ),
        );
      }),
    );
  },
  {
    functional: true,
  },
);

export const fetchProductsByUnitOfMeasure$ = createEffect(
  (actions$ = inject(Actions), productService = inject(ProductService)) => {
    return actions$.pipe(
      ofType(lab1ProductActions.fetchProductsByUnitOfMeasure),
      switchMap(({unitOfMeasures}) => {
        return productService.getProductsByUnitOfMeasure(unitOfMeasures).pipe(
          map((products) =>
            lab1ProductActions.productsByUnitOfMeasureFetched({products}),
          ),
          catchError((error: unknown) =>
            of(
              lab1ProductActions.productRequestFailed({
                error: error as HttpErrorResponse,
              }),
            ),
          ),
        );
      }),
    );
  },
  {
    functional: true,
  },
);

export const decreaseAllPrices$ = createEffect(
  (actions$ = inject(Actions), productService = inject(ProductService)) => {
    return actions$.pipe(
      ofType(lab1ProductActions.decreaseAllPrices),
      switchMap(({percent}) => {
        return productService.decreaseAllPrices(percent).pipe(
          map(() => lab1ProductActions.allPricesDecreased()),
          catchError((error: unknown) =>
            of(
              lab1ProductActions.productRequestFailed({
                error: error as HttpErrorResponse,
              }),
            ),
          ),
        );
      }),
    );
  },
  {
    functional: true,
  },
);
