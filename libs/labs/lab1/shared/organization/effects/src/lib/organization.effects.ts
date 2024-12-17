import type {HttpErrorResponse} from '@angular/common/http';
import {inject} from '@angular/core';
import {OrganizationService} from '@is/labs/lab1/shared/organization/data-access';
import {lab1OrganizationActions} from '@is/labs/lab1/shared/organization/store';
import {lab1RootActions} from '@is/labs/lab1/shared/root/store';
import type {ErrorResponse} from '@is/labs/lab1/shared/types';
import {selectAccessToken} from '@is/labs/lab1/shared/user/store';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {concatLatestFrom} from '@ngrx/operators';
import {Store} from '@ngrx/store';
import {catchError, filter, map, of, switchMap, take, tap} from 'rxjs';

export const organizationInitialFetch$ = createEffect(
  (actions$ = inject(Actions)) => {
    return actions$.pipe(
      ofType(lab1RootActions.setActiveTab),
      filter(({activeTab}) => activeTab === 'organization'),
      take(1),
      map(() => lab1OrganizationActions.fetchOrganizations()),
    );
  },
  {
    functional: true,
  },
);

export const fetchOrganization$ = createEffect(
  (actions$ = inject(Actions), organizationService = inject(OrganizationService)) => {
    return actions$.pipe(
      ofType(lab1OrganizationActions.fetchOrganizations),
      switchMap(() => {
        return organizationService.getAllOrganizations().pipe(
          map((organizations) =>
            lab1OrganizationActions.organizationsFetched({organizations}),
          ),
          catchError((error: unknown) =>
            of(
              lab1OrganizationActions.organizationFetchFailed({
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
    organizationService = inject(OrganizationService),
  ) => {
    return actions$.pipe(
      ofType(lab1OrganizationActions.fetchOrganizations),
      concatLatestFrom(() => [store$.select(selectAccessToken)]),
      filter(([, accessToken]) => !!accessToken),
      take(1),
      tap(([, accessToken]) => organizationService.wsConnect(accessToken ?? '')),
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
      ofType(lab1OrganizationActions.organizationFetchFailed),
      map(({error}) =>
        lab1RootActions.showHttpErrorAlert({
          error: (error.error as ErrorResponse) ?? error,
        }),
      ),
    );
  },
  {functional: true},
);
