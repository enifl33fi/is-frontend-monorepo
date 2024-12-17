import type {HttpErrorResponse} from '@angular/common/http';
import {inject} from '@angular/core';
import {CoordinatesService} from '@is/labs/lab1/shared/coordinates/data-access';
import {lab1CoordinatesActions} from '@is/labs/lab1/shared/coordinates/store';
import {lab1RootActions} from '@is/labs/lab1/shared/root/store';
import type {ErrorResponse} from '@is/labs/lab1/shared/types';
import {selectAccessToken} from '@is/labs/lab1/shared/user/store';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {concatLatestFrom} from '@ngrx/operators';
import {Store} from '@ngrx/store';
import {catchError, filter, map, of, switchMap, take, tap} from 'rxjs';

export const coordinatesInitialFetch$ = createEffect(
  (actions$ = inject(Actions)) => {
    return actions$.pipe(
      ofType(lab1RootActions.setActiveTab),
      filter(({activeTab}) => activeTab === 'coordinates'),
      take(1),
      map(() => lab1CoordinatesActions.fetchCoordinates()),
    );
  },
  {
    functional: true,
  },
);

export const fetchCoordinates$ = createEffect(
  (actions$ = inject(Actions), coordinatesService = inject(CoordinatesService)) => {
    return actions$.pipe(
      ofType(lab1CoordinatesActions.fetchCoordinates),
      switchMap(() => {
        return coordinatesService.getAllCoordinates().pipe(
          map((coordinates) => lab1CoordinatesActions.coordinatesFetched({coordinates})),
          catchError((error: unknown) =>
            of(
              lab1CoordinatesActions.coordinatesFetchFailed({
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
    coordinatesService = inject(CoordinatesService),
  ) => {
    return actions$.pipe(
      ofType(lab1CoordinatesActions.fetchCoordinates),
      concatLatestFrom(() => [store$.select(selectAccessToken)]),
      filter(([, accessToken]) => !!accessToken),
      take(1),
      tap(([, accessToken]) => coordinatesService.wsConnect(accessToken ?? '')),
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
      ofType(lab1CoordinatesActions.coordinatesFetchFailed),
      map(({error}) =>
        lab1RootActions.showHttpErrorAlert({
          error: (error.error as ErrorResponse) ?? error,
        }),
      ),
    );
  },
  {functional: true},
);
