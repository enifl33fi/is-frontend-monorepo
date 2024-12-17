import type {HttpErrorResponse} from '@angular/common/http';
import {inject} from '@angular/core';
import {ProductService} from '@is/labs/lab1/shared/product/data-access';
import {lab1ProductActions} from '@is/labs/lab1/shared/product/store';
import {lab1RootActions} from '@is/labs/lab1/shared/root/store';
import type {ErrorResponse} from '@is/labs/lab1/shared/types';
import {selectAccessToken} from '@is/labs/lab1/shared/user/store';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {concatLatestFrom} from '@ngrx/operators';
import {Store} from '@ngrx/store';
import {catchError, filter, map, of, switchMap, take, tap} from 'rxjs';

export const productInitialFetch$ = createEffect(
  (actions$ = inject(Actions)) => {
    return actions$.pipe(
      ofType(lab1RootActions.setActiveTab),
      filter(({activeTab}) => activeTab === 'product'),
      take(1),
      map(() => lab1ProductActions.fetchProducts()),
    );
  },
  {
    functional: true,
  },
);

export const fetchProducts = createEffect(
  (actions$ = inject(Actions), productService = inject(ProductService)) => {
    return actions$.pipe(
      ofType(lab1ProductActions.fetchProducts),
      switchMap(() => {
        return productService.getAllProducts().pipe(
          map((products) => lab1ProductActions.productsFetched({products})),
          catchError((error: unknown) =>
            of(
              lab1ProductActions.productFetchFailed({
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

export const showErrorAlert$ = createEffect(
  (actions$ = inject(Actions)) => {
    return actions$.pipe(
      ofType(lab1ProductActions.productFetchFailed),
      map(({error}) =>
        lab1RootActions.showHttpErrorAlert({
          error: (error.error as ErrorResponse) ?? error,
        }),
      ),
    );
  },
  {functional: true},
);
