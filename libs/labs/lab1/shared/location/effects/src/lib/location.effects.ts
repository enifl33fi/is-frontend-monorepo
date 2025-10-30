import type {HttpErrorResponse} from '@angular/common/http';
import {inject, INJECTOR} from '@angular/core';
import {LocationService} from '@is/labs/lab1/shared/location/data-access';
import {
  lab1LocationActions,
  selectQueryParams,
} from '@is/labs/lab1/shared/location/store';
import type {LocationDialogContext} from '@is/labs/lab1/shared/location/ui';
import {LocationDialogComponent} from '@is/labs/lab1/shared/location/ui';
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
      ofType(lab1LocationActions.queryParamsFetched),
      concatLatestFrom(() => [store$.select(selectQueryParams)]),
      filter(
        ([{queryParams}, previousQueryParams]) =>
          !objectCompareFn(queryParams, previousQueryParams),
      ),
      map(([{queryParams}]) => lab1LocationActions.queryParamsUpdated({queryParams})),
    );
  },
  {
    functional: true,
  },
);

export const fetchByUpdQuery$$ = createEffect(
  (actions$ = inject(Actions)) => {
    return actions$.pipe(
      ofType(lab1LocationActions.queryParamsUpdated),
      map(() => lab1LocationActions.fetchLocations()),
    );
  },
  {
    functional: true,
  },
);

export const fetchLocations$ = createEffect(
  (
    actions$ = inject(Actions),
    store$ = inject(Store),
    locationService = inject(LocationService),
  ) => {
    return actions$.pipe(
      ofType(lab1LocationActions.fetchLocations),
      concatLatestFrom(() => [store$.select(selectQueryParams)]),
      switchMap(([, queryParams]) => {
        return locationService.getAllLocations(queryParams).pipe(
          map((response) => lab1LocationActions.locationsFetched({response})),
          catchError((error: unknown) =>
            of(
              lab1LocationActions.locationRequestFailed({
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
    locationService = inject(LocationService),
  ) => {
    return actions$.pipe(
      ofType(lab1LocationActions.fetchLocations),
      concatLatestFrom(() => [store$.select(selectAccessToken)]),
      filter(([, accessToken]) => !!accessToken),
      take(1),
      tap(([, accessToken]) => locationService.wsConnect(accessToken ?? '')),
    );
  },
  {
    functional: true,
    dispatch: false,
  },
);

export const fetchLocationById$ = createEffect(
  (actions$ = inject(Actions), locationService = inject(LocationService)) => {
    return actions$.pipe(
      ofType(lab1LocationActions.fetchLocationById),
      switchMap(({id}) => {
        return locationService.getLocation(id).pipe(
          map((location) => lab1LocationActions.locationByIdFetched({location})),
          catchError((error: unknown) =>
            of(
              lab1LocationActions.locationRequestFailed({
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

export const addLocation$ = createEffect(
  (actions$ = inject(Actions), locationService = inject(LocationService)) => {
    return actions$.pipe(
      ofType(lab1LocationActions.addLocation),
      switchMap(({location}) => {
        return locationService.addLocation(location).pipe(
          map((location) => lab1LocationActions.addLocationCompleted({location})),
          catchError((error: unknown) =>
            of(
              lab1LocationActions.locationRequestFailed({
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

export const updateLocation$ = createEffect(
  (actions$ = inject(Actions), locationService = inject(LocationService)) => {
    return actions$.pipe(
      ofType(lab1LocationActions.updateLocation),
      switchMap(({location}) => {
        return locationService.updateLocation(location).pipe(
          map((location) => lab1LocationActions.updateLocationCompleted({location})),
          catchError((error: unknown) =>
            of(
              lab1LocationActions.locationRequestFailed({
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

export const deleteLocation$ = createEffect(
  (actions$ = inject(Actions), locationService = inject(LocationService)) => {
    return actions$.pipe(
      ofType(lab1LocationActions.deleteLocation),
      switchMap(({id}) => {
        return locationService.deleteLocation(id).pipe(
          map(() => lab1LocationActions.deleteLocationCompleted()),
          catchError((error: unknown) =>
            of(
              lab1LocationActions.locationRequestFailed({
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
        lab1LocationActions.addLocationCompleted,
        lab1LocationActions.updateLocationCompleted,
        lab1LocationActions.deleteLocationCompleted,
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
      ofType(lab1LocationActions.showViewDialog),
      map(({id}) => lab1LocationActions.fetchLocationById({id})),
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
      ofType(lab1LocationActions.showViewDialog),
      observeOn(asyncScheduler),
      switchMap(() => {
        return dialogs.open<LocationDialogContext>(
          new PolymorpheusComponent(LocationDialogComponent, injector),
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
      ofType(lab1LocationActions.showAddDialog),
      switchMap(() => {
        return dialogs.open<LocationDialogContext>(
          new PolymorpheusComponent(LocationDialogComponent, injector),
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

export const fetchOwnLocationIds$ = createEffect(
  (actions$ = inject(Actions), locationService = inject(LocationService)) => {
    return actions$.pipe(
      ofType(lab1LocationActions.fetchOwnLocationIds),
      switchMap(() => {
        return locationService.getOwnIds().pipe(
          map((ids) => lab1LocationActions.ownLocationIdsFetched({ids})),
          catchError((error: unknown) =>
            of(
              lab1LocationActions.locationRequestFailed({
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
      ofType(lab1LocationActions.locationRequestFailed),
      map(({error}) =>
        lab1RootActions.showHttpErrorAlert({
          error: (error.error as ErrorResponse) ?? error,
        }),
      ),
    );
  },
  {functional: true},
);
