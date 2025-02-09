import type {HttpErrorResponse} from '@angular/common/http';
import {inject, INJECTOR} from '@angular/core';
import {AddressService} from '@is/labs/lab1/shared/address/data-access';
import {lab1AddressActions} from '@is/labs/lab1/shared/address/store';
import type {AddressDialogContext} from '@is/labs/lab1/shared/address/ui';
import {AddressDialogComponent} from '@is/labs/lab1/shared/address/ui';
import {lab1LocationActions} from '@is/labs/lab1/shared/location/store';
import {lab1RootActions} from '@is/labs/lab1/shared/root/store';
import type {ErrorResponse} from '@is/labs/lab1/shared/types';
import {selectAccessToken} from '@is/labs/lab1/shared/user/store';
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
              lab1AddressActions.addressRequestFailed({
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

export const fetchAddressById$ = createEffect(
  (actions$ = inject(Actions), addressService = inject(AddressService)) => {
    return actions$.pipe(
      ofType(lab1AddressActions.fetchAddressesById),
      switchMap(({id}) => {
        return addressService.getAddress(id).pipe(
          map((address) => lab1AddressActions.addressByIdFetched({address})),
          catchError((error: unknown) =>
            of(
              lab1AddressActions.addressRequestFailed({
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

export const addAddress$ = createEffect(
  (actions$ = inject(Actions), addressService = inject(AddressService)) => {
    return actions$.pipe(
      ofType(lab1AddressActions.addAddress),
      switchMap(({address}) => {
        return addressService.addAddress(address).pipe(
          map((address) => lab1AddressActions.addAddressCompleted({address})),
          catchError((error: unknown) =>
            of(
              lab1AddressActions.addressRequestFailed({
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

export const updateAddress$ = createEffect(
  (actions$ = inject(Actions), addressService = inject(AddressService)) => {
    return actions$.pipe(
      ofType(lab1AddressActions.updateAddress),
      switchMap(({address}) => {
        return addressService.updateAddress(address).pipe(
          map((address) => lab1AddressActions.updateAddressCompleted({address})),
          catchError((error: unknown) =>
            of(
              lab1AddressActions.addressRequestFailed({
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

export const deleteAddress$ = createEffect(
  (actions$ = inject(Actions), addressService = inject(AddressService)) => {
    return actions$.pipe(
      ofType(lab1AddressActions.deleteAddress),
      switchMap(({id}) => {
        return addressService.deleteAddress(id).pipe(
          map(() => lab1AddressActions.deleteAddressCompleted()),
          catchError((error: unknown) =>
            of(
              lab1AddressActions.addressRequestFailed({
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
        lab1AddressActions.addAddressCompleted,
        lab1AddressActions.updateAddressCompleted,
        lab1AddressActions.deleteAddressCompleted,
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
      ofType(lab1AddressActions.showViewDialog),
      switchMap(({id}) => {
        return [
          lab1AddressActions.fetchAddressesById({id}),
          lab1LocationActions.fetchOwnLocationIds(),
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
      ofType(lab1AddressActions.showAddDialog),
      map(() => lab1LocationActions.fetchOwnLocationIds()),
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
      ofType(lab1AddressActions.showViewDialog),
      observeOn(asyncScheduler),
      switchMap(() => {
        return dialogs.open<AddressDialogContext>(
          new PolymorpheusComponent(AddressDialogComponent, injector),
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
      ofType(lab1AddressActions.showAddDialog),
      switchMap(() => {
        return dialogs.open<AddressDialogContext>(
          new PolymorpheusComponent(AddressDialogComponent, injector),
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

export const fetchOwnAddressIds$ = createEffect(
  (actions$ = inject(Actions), addressService = inject(AddressService)) => {
    return actions$.pipe(
      ofType(lab1AddressActions.fetchOwnAddressIds),
      switchMap(() => {
        return addressService.getOwnIds().pipe(
          map((ids) => lab1AddressActions.ownAddressIdsFetched({ids})),
          catchError((error: unknown) =>
            of(
              lab1AddressActions.addressRequestFailed({
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

export const showErrorAlert$ = createEffect(
  (actions$ = inject(Actions)) => {
    return actions$.pipe(
      ofType(lab1AddressActions.addressRequestFailed),
      map(({error}) =>
        lab1RootActions.showHttpErrorAlert({
          error: (error.error as ErrorResponse) ?? error,
        }),
      ),
    );
  },
  {functional: true},
);
