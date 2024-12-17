import type {HttpErrorResponse} from '@angular/common/http';
import {inject} from '@angular/core';
import {PersonService} from '@is/labs/lab1/shared/person/data-access';
import {lab1PersonActions} from '@is/labs/lab1/shared/person/store';
import {lab1RootActions} from '@is/labs/lab1/shared/root/store';
import type {ErrorResponse} from '@is/labs/lab1/shared/types';
import {selectAccessToken} from '@is/labs/lab1/shared/user/store';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {concatLatestFrom} from '@ngrx/operators';
import {Store} from '@ngrx/store';
import {catchError, filter, map, of, switchMap, take, tap} from 'rxjs';

export const personInitialFetch$ = createEffect(
  (actions$ = inject(Actions)) => {
    return actions$.pipe(
      ofType(lab1RootActions.setActiveTab),
      filter(({activeTab}) => activeTab === 'person'),
      take(1),
      map(() => lab1PersonActions.fetchPersons()),
    );
  },
  {
    functional: true,
  },
);

export const fetchPersons$ = createEffect(
  (actions$ = inject(Actions), personService = inject(PersonService)) => {
    return actions$.pipe(
      ofType(lab1PersonActions.fetchPersons),
      switchMap(() => {
        return personService.getAllPersons().pipe(
          map((persons) => lab1PersonActions.personsFetched({persons})),
          catchError((error: unknown) =>
            of(
              lab1PersonActions.personFetchFailed({
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

export const showErrorAlert$ = createEffect(
  (actions$ = inject(Actions)) => {
    return actions$.pipe(
      ofType(lab1PersonActions.personFetchFailed),
      map(({error}) =>
        lab1RootActions.showHttpErrorAlert({
          error: (error.error as ErrorResponse) ?? error,
        }),
      ),
    );
  },
  {functional: true},
);
