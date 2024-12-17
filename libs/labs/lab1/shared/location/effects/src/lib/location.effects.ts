import type {HttpErrorResponse} from '@angular/common/http';
import {inject} from '@angular/core';
import {LocationService} from '@is/labs/lab1/shared/location/data-access';
import {lab1LocationActions} from '@is/labs/lab1/shared/location/store';
import {lab1RootActions} from '@is/labs/lab1/shared/root/store';
import type {ErrorResponse} from '@is/labs/lab1/shared/types';
import {selectAccessToken} from '@is/labs/lab1/shared/user/store';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {concatLatestFrom} from '@ngrx/operators';
import {Store} from '@ngrx/store';
import {catchError, filter, map, of, switchMap, take, tap} from 'rxjs';

export const locationInitialFetch$ = createEffect(
  (actions$ = inject(Actions)) => {
    return actions$.pipe(
      ofType(lab1RootActions.setActiveTab),
      filter(({activeTab}) => activeTab === 'location'),
      take(1),
      map(() => lab1LocationActions.fetchLocations()),
    );
  },
  {
    functional: true,
  },
);

export const fetchLocations$ = createEffect(
  (actions$ = inject(Actions), locationService = inject(LocationService)) => {
    return actions$.pipe(
      ofType(lab1LocationActions.fetchLocations),
      switchMap(() => {
        return locationService.getAllLocations().pipe(
          map((locations) => lab1LocationActions.locationsFetched({locations})),
          catchError((error: unknown) =>
            of(
              lab1LocationActions.locationFetchFailed({
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

export const showErrorAlert$ = createEffect(
  (actions$ = inject(Actions)) => {
    return actions$.pipe(
      ofType(lab1LocationActions.locationFetchFailed),
      map(({error}) =>
        lab1RootActions.showHttpErrorAlert({
          error: (error.error as ErrorResponse) ?? error,
        }),
      ),
    );
  },
  {functional: true},
);
