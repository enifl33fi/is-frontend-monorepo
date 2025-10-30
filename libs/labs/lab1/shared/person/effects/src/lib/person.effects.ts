import type {HttpErrorResponse} from '@angular/common/http';
import {inject, INJECTOR} from '@angular/core';
import {lab1LocationActions} from '@is/labs/lab1/shared/location/store';
import {PersonService} from '@is/labs/lab1/shared/person/data-access';
import {lab1PersonActions, selectQueryParams} from '@is/labs/lab1/shared/person/store';
import type {PersonDialogContext} from '@is/labs/lab1/shared/person/ui';
import {PersonDialogComponent} from '@is/labs/lab1/shared/person/ui';
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
      ofType(lab1PersonActions.queryParamsFetched),
      concatLatestFrom(() => [store$.select(selectQueryParams)]),
      filter(
        ([{queryParams}, previousQueryParams]) =>
          !objectCompareFn(queryParams, previousQueryParams),
      ),
      map(([{queryParams}]) => lab1PersonActions.queryParamsUpdated({queryParams})),
    );
  },
  {
    functional: true,
  },
);

export const fetchByUpdQuery$ = createEffect(
  (actions$ = inject(Actions)) => {
    return actions$.pipe(
      ofType(lab1PersonActions.queryParamsUpdated),
      map(() => lab1PersonActions.fetchPersons()),
    );
  },
  {
    functional: true,
  },
);

export const fetchPersons$ = createEffect(
  (
    actions$ = inject(Actions),
    store$ = inject(Store),
    personService = inject(PersonService),
  ) => {
    return actions$.pipe(
      ofType(lab1PersonActions.fetchPersons),
      concatLatestFrom(() => [store$.select(selectQueryParams)]),
      switchMap(([, queryParams]) => {
        return personService.getAllPersons(queryParams).pipe(
          map((response) => lab1PersonActions.personsFetched({response})),
          catchError((error: unknown) =>
            of(
              lab1PersonActions.personRequestFailed({
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
    personService = inject(PersonService),
  ) => {
    return actions$.pipe(
      ofType(lab1PersonActions.fetchPersons),
      concatLatestFrom(() => [store$.select(selectAccessToken)]),
      filter(([, accessToken]) => !!accessToken),
      take(1),
      tap(([, accessToken]) => personService.wsConnect(accessToken ?? '')),
    );
  },
  {
    functional: true,
    dispatch: false,
  },
);

export const fetchPersonById$ = createEffect(
  (actions$ = inject(Actions), personService = inject(PersonService)) => {
    return actions$.pipe(
      ofType(lab1PersonActions.fetchPersonById),
      switchMap(({id}) => {
        return personService.getPerson(id).pipe(
          map((person) => lab1PersonActions.personByIdFetched({person})),
          catchError((error: unknown) =>
            of(
              lab1PersonActions.personRequestFailed({
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

export const addPerson$ = createEffect(
  (actions$ = inject(Actions), personService = inject(PersonService)) => {
    return actions$.pipe(
      ofType(lab1PersonActions.addPerson),
      switchMap(({person}) => {
        return personService.addPerson(person).pipe(
          map((person) => lab1PersonActions.addPersonCompleted({person})),
          catchError((error: unknown) =>
            of(
              lab1PersonActions.personRequestFailed({
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

export const updatePerson$ = createEffect(
  (actions$ = inject(Actions), personService = inject(PersonService)) => {
    return actions$.pipe(
      ofType(lab1PersonActions.updatePerson),
      switchMap(({person}) => {
        return personService.updatePerson(person).pipe(
          map((person) => lab1PersonActions.updatePersonCompleted({person})),
          catchError((error: unknown) =>
            of(
              lab1PersonActions.personRequestFailed({
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

export const deletePerson$ = createEffect(
  (actions$ = inject(Actions), personService = inject(PersonService)) => {
    return actions$.pipe(
      ofType(lab1PersonActions.deletePerson),
      switchMap(({id}) => {
        return personService.deletePerson(id).pipe(
          map(() => lab1PersonActions.deletePersonCompleted()),
          catchError((error: unknown) =>
            of(
              lab1PersonActions.personRequestFailed({
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
        lab1PersonActions.addPersonCompleted,
        lab1PersonActions.updatePersonCompleted,
        lab1PersonActions.deletePersonCompleted,
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
      ofType(lab1PersonActions.showViewDialog),
      switchMap(({id}) => {
        return [
          lab1PersonActions.fetchPersonById({id}),
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
      ofType(lab1PersonActions.showAddDialog),
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
      ofType(lab1PersonActions.showViewDialog),
      observeOn(asyncScheduler),
      switchMap(() => {
        return dialogs.open<PersonDialogContext>(
          new PolymorpheusComponent(PersonDialogComponent, injector),
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
      ofType(lab1PersonActions.showAddDialog),
      switchMap(() => {
        return dialogs.open<PersonDialogContext>(
          new PolymorpheusComponent(PersonDialogComponent, injector),
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

export const fetchOwnPersonIds$ = createEffect(
  (actions$ = inject(Actions), personService = inject(PersonService)) => {
    return actions$.pipe(
      ofType(lab1PersonActions.fetchOwnPersonIds),
      switchMap(() => {
        return personService.getOwnIds().pipe(
          map((ids) => lab1PersonActions.ownPersonIdsFetched({ids})),
          catchError((error: unknown) =>
            of(
              lab1PersonActions.personRequestFailed({
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
      ofType(lab1PersonActions.personRequestFailed),
      map(({error}) =>
        lab1RootActions.showHttpErrorAlert({
          error: (error.error as ErrorResponse) ?? error,
        }),
      ),
    );
  },
  {functional: true},
);
