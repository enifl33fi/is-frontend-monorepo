import type {HttpErrorResponse} from '@angular/common/http';
import {inject, INJECTOR} from '@angular/core';
import {CoordinatesService} from '@is/labs/lab1/shared/coordinates/data-access';
import {
  lab1CoordinatesActions,
  selectQueryParams,
} from '@is/labs/lab1/shared/coordinates/store';
import type {CoordinatesDialogContext} from '@is/labs/lab1/shared/coordinates/ui';
import {CoordinatesDialogComponent} from '@is/labs/lab1/shared/coordinates/ui';
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
  concatMap,
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
      ofType(lab1CoordinatesActions.queryParamsFetched),
      concatLatestFrom(() => [store$.select(selectQueryParams)]),
      filter(
        ([{queryParams}, previousQueryParams]) =>
          !objectCompareFn(queryParams, previousQueryParams),
      ),
      map(([{queryParams}]) => lab1CoordinatesActions.queryParamsUpdated({queryParams})),
    );
  },
  {
    functional: true,
  },
);

export const coordinatesInitialFetch$ = createEffect(
  (actions$ = inject(Actions)) => {
    return actions$.pipe(
      ofType(lab1CoordinatesActions.queryParamsUpdated),
      map(() => lab1CoordinatesActions.fetchCoordinates()),
    );
  },
  {
    functional: true,
  },
);

export const fetchCoordinates$ = createEffect(
  (
    actions$ = inject(Actions),
    store$ = inject(Store),
    coordinatesService = inject(CoordinatesService),
  ) => {
    return actions$.pipe(
      ofType(lab1CoordinatesActions.fetchCoordinates),
      concatLatestFrom(() => [store$.select(selectQueryParams)]),
      switchMap(([, queryParams]) => {
        return coordinatesService.getAllCoordinates(queryParams).pipe(
          map((response) => lab1CoordinatesActions.coordinatesFetched({response})),
          catchError((error: unknown) =>
            of(
              lab1CoordinatesActions.coordinatesRequestFailed({
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

export const fetchCoordinatesById$ = createEffect(
  (actions$ = inject(Actions), coordinatesService = inject(CoordinatesService)) => {
    return actions$.pipe(
      ofType(lab1CoordinatesActions.fetchCoordinatesById),
      concatMap(({id}) => {
        return coordinatesService.getCoordinates(id).pipe(
          map((coordinates) =>
            lab1CoordinatesActions.coordinatesByIdFetched({coordinates}),
          ),
          catchError((error: unknown) =>
            of(
              lab1CoordinatesActions.coordinatesRequestFailed({
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

export const addCoordinates$ = createEffect(
  (actions$ = inject(Actions), coordinatesService = inject(CoordinatesService)) => {
    return actions$.pipe(
      ofType(lab1CoordinatesActions.addCoordinates),
      concatMap(({coordinates}) => {
        return coordinatesService.addCoordinates(coordinates).pipe(
          map((coordinates) =>
            lab1CoordinatesActions.addCoordinatesCompleted({coordinates}),
          ),
          catchError((error: unknown) =>
            of(
              lab1CoordinatesActions.coordinatesRequestFailed({
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

export const updateCoordinates$ = createEffect(
  (actions$ = inject(Actions), coordinatesService = inject(CoordinatesService)) => {
    return actions$.pipe(
      ofType(lab1CoordinatesActions.updateCoordinates),
      concatMap(({coordinates}) => {
        return coordinatesService.updateCoordinates(coordinates).pipe(
          map((coordinates) =>
            lab1CoordinatesActions.updateCoordinatesCompleted({coordinates}),
          ),
          catchError((error: unknown) =>
            of(
              lab1CoordinatesActions.coordinatesRequestFailed({
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

export const deleteCoordinates$ = createEffect(
  (actions$ = inject(Actions), coordinatesService = inject(CoordinatesService)) => {
    return actions$.pipe(
      ofType(lab1CoordinatesActions.deleteCoordinates),
      concatMap(({id}) => {
        return coordinatesService.deleteCoordinates(id).pipe(
          map(() => lab1CoordinatesActions.deleteCoordinatesCompleted()),
          catchError((error: unknown) =>
            of(
              lab1CoordinatesActions.coordinatesRequestFailed({
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
        lab1CoordinatesActions.addCoordinatesCompleted,
        lab1CoordinatesActions.updateCoordinatesCompleted,
        lab1CoordinatesActions.deleteCoordinatesCompleted,
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

export const fetchViewDialogData = createEffect(
  (actions$ = inject(Actions)) => {
    return actions$.pipe(
      ofType(lab1CoordinatesActions.showViewDialog),
      map(({id}) => lab1CoordinatesActions.fetchCoordinatesById({id})),
    );
  },
  {
    functional: true,
  },
);

export const showViewDialog = createEffect(
  (
    actions$ = inject(Actions),
    dialogs = inject(TuiDialogService),
    injector = inject(INJECTOR),
  ) => {
    return actions$.pipe(
      ofType(lab1CoordinatesActions.showViewDialog),
      observeOn(asyncScheduler),
      switchMap(() => {
        return dialogs.open<CoordinatesDialogContext>(
          new PolymorpheusComponent(CoordinatesDialogComponent, injector),
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

export const showAddDialog = createEffect(
  (
    actions$ = inject(Actions),
    dialogs = inject(TuiDialogService),
    injector = inject(INJECTOR),
  ) => {
    return actions$.pipe(
      ofType(lab1CoordinatesActions.showAddDialog),
      switchMap(() => {
        return dialogs.open<CoordinatesDialogContext>(
          new PolymorpheusComponent(CoordinatesDialogComponent, injector),
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

export const fetchOwnCooridnatesIds$ = createEffect(
  (actions$ = inject(Actions), coordinatesService = inject(CoordinatesService)) => {
    return actions$.pipe(
      ofType(lab1CoordinatesActions.fetchOwnCoordinatesIds),
      switchMap(() => {
        return coordinatesService.getOwnIds().pipe(
          map((ids) => lab1CoordinatesActions.ownCoordinatesIdsFetched({ids})),
          catchError((error: unknown) =>
            of(
              lab1CoordinatesActions.coordinatesRequestFailed({
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
      ofType(lab1CoordinatesActions.coordinatesRequestFailed),
      map(({error}) =>
        lab1RootActions.showHttpErrorAlert({
          error: (error.error as ErrorResponse) ?? error,
        }),
      ),
    );
  },
  {functional: true},
);
