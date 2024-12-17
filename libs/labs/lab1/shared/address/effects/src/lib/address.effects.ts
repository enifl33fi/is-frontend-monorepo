import type {HttpErrorResponse} from '@angular/common/http';
import {inject} from '@angular/core';
import {AddressService} from '@is/labs/lab1/shared/address/data-access';
import {lab1AddressActions} from '@is/labs/lab1/shared/address/store';
import {lab1RootActions} from '@is/labs/lab1/shared/root/store';
import type {ErrorResponse} from '@is/labs/lab1/shared/types';
import {selectAccessToken} from '@is/labs/lab1/shared/user/store';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {concatLatestFrom} from '@ngrx/operators';
import {Store} from '@ngrx/store';
import {catchError, filter, map, of, switchMap, take, tap} from 'rxjs';

export const addressInitialFetch$ = createEffect(
  (actions$ = inject(Actions)) => {
    return actions$.pipe(
      ofType(lab1RootActions.setActiveTab),
      filter(({activeTab}) => activeTab === 'address'),
      take(1),
      map(() => lab1AddressActions.fetchAddresses()),
    );
  },
  {
    functional: true,
  },
);

export const fetchAddresses$ = createEffect(
  (actions$ = inject(Actions), addressService = inject(AddressService)) => {
    return actions$.pipe(
      ofType(lab1AddressActions.fetchAddresses),
      switchMap(() => {
        return addressService.getAllAddresses().pipe(
          map((addresses) => lab1AddressActions.addressesFetched({addresses})),
          catchError((error: unknown) =>
            of(
              lab1AddressActions.addressFetchFailed({error: error as HttpErrorResponse}),
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
    addressService = inject(AddressService),
  ) => {
    return actions$.pipe(
      ofType(lab1AddressActions.fetchAddresses),
      concatLatestFrom(() => [store$.select(selectAccessToken)]),
      filter(([, accessToken]) => !!accessToken),
      take(1),
      tap(([, accessToken]) => addressService.wsConnect(accessToken ?? '')),
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
      ofType(lab1AddressActions.addressFetchFailed),
      map(({error}) =>
        lab1RootActions.showHttpErrorAlert({
          error: (error.error as ErrorResponse) ?? error,
        }),
      ),
    );
  },
  {functional: true},
);
