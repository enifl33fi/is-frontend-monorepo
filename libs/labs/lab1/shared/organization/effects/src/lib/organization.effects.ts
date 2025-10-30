import type {HttpErrorResponse} from '@angular/common/http';
import {inject, INJECTOR} from '@angular/core';
import {lab1AddressActions} from '@is/labs/lab1/shared/address/store';
import {OrganizationService} from '@is/labs/lab1/shared/organization/data-access';
import {
  lab1OrganizationActions,
  selectQueryParams,
} from '@is/labs/lab1/shared/organization/store';
import type {OrganizationDialogContext} from '@is/labs/lab1/shared/organization/ui';
import {OrganizationDialogComponent} from '@is/labs/lab1/shared/organization/ui';
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
      ofType(lab1OrganizationActions.queryParamsFetched),
      concatLatestFrom(() => [store$.select(selectQueryParams)]),
      filter(
        ([{queryParams}, previousQueryParams]) =>
          !objectCompareFn(queryParams, previousQueryParams),
      ),
      map(([{queryParams}]) => lab1OrganizationActions.queryParamsUpdated({queryParams})),
    );
  },
  {
    functional: true,
  },
);

export const fetchByUpdQuery$ = createEffect(
  (actions$ = inject(Actions)) => {
    return actions$.pipe(
      ofType(lab1OrganizationActions.queryParamsUpdated),
      map(() => lab1OrganizationActions.fetchOrganizations()),
    );
  },
  {
    functional: true,
  },
);

export const fetchOrganizations$ = createEffect(
  (
    actions$ = inject(Actions),
    store$ = inject(Store),
    organizationService = inject(OrganizationService),
  ) => {
    return actions$.pipe(
      ofType(lab1OrganizationActions.fetchOrganizations),
      concatLatestFrom(() => [store$.select(selectQueryParams)]),
      switchMap(([, queryParams]) => {
        return organizationService.getAllOrganizations(queryParams).pipe(
          map((response) => lab1OrganizationActions.organizationsFetched({response})),
          catchError((error: unknown) =>
            of(
              lab1OrganizationActions.organizationRequestFailed({
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

export const fetchOrganizationById$ = createEffect(
  (actions$ = inject(Actions), organizationService = inject(OrganizationService)) => {
    return actions$.pipe(
      ofType(lab1OrganizationActions.fetchOrganizationById),
      switchMap(({id}) => {
        return organizationService.getOrganization(id).pipe(
          map((organization) =>
            lab1OrganizationActions.organizationByIdFetched({organization}),
          ),
          catchError((error: unknown) =>
            of(
              lab1OrganizationActions.organizationRequestFailed({
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

export const addOrganization$ = createEffect(
  (actions$ = inject(Actions), organizationService = inject(OrganizationService)) => {
    return actions$.pipe(
      ofType(lab1OrganizationActions.addOrganization),
      switchMap(({organization}) => {
        return organizationService.addOrganization(organization).pipe(
          map((organization) =>
            lab1OrganizationActions.addOrganizationCompleted({organization}),
          ),
          catchError((error: unknown) =>
            of(
              lab1OrganizationActions.organizationRequestFailed({
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

export const updateOrganization$ = createEffect(
  (actions$ = inject(Actions), organizationService = inject(OrganizationService)) => {
    return actions$.pipe(
      ofType(lab1OrganizationActions.updateOrganization),
      switchMap(({organization}) => {
        return organizationService.updateOrganization(organization).pipe(
          map((organization) =>
            lab1OrganizationActions.updateOrganizationCompleted({organization}),
          ),
          catchError((error: unknown) =>
            of(
              lab1OrganizationActions.organizationRequestFailed({
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

export const deleteOrganization$ = createEffect(
  (actions$ = inject(Actions), organizationService = inject(OrganizationService)) => {
    return actions$.pipe(
      ofType(lab1OrganizationActions.deleteOrganization),
      switchMap(({id}) => {
        return organizationService.deleteOrganization(id).pipe(
          map(() => lab1OrganizationActions.deleteOrganizationCompleted()),
          catchError((error: unknown) =>
            of(
              lab1OrganizationActions.organizationRequestFailed({
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
        lab1OrganizationActions.addOrganizationCompleted,
        lab1OrganizationActions.updateOrganizationCompleted,
        lab1OrganizationActions.deleteOrganizationCompleted,
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
      ofType(lab1OrganizationActions.showViewDialog),
      switchMap(({id}) => {
        return [
          lab1OrganizationActions.fetchOrganizationById({id}),
          lab1AddressActions.fetchOwnAddressIds(),
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
      ofType(lab1OrganizationActions.showAddDialog),
      map(() => lab1AddressActions.fetchOwnAddressIds()),
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
      ofType(lab1OrganizationActions.showViewDialog),
      observeOn(asyncScheduler),
      switchMap(() => {
        return dialogs.open<OrganizationDialogContext>(
          new PolymorpheusComponent(OrganizationDialogComponent, injector),
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
      ofType(lab1OrganizationActions.showAddDialog),
      switchMap(() => {
        return dialogs.open<OrganizationDialogContext>(
          new PolymorpheusComponent(OrganizationDialogComponent, injector),
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

export const fetchOwnOrganizationIds$ = createEffect(
  (actions$ = inject(Actions), organizationService = inject(OrganizationService)) => {
    return actions$.pipe(
      ofType(lab1OrganizationActions.fetchOwnOrganizationIds),
      switchMap(() => {
        return organizationService.getOwnIds().pipe(
          map((ids) => lab1OrganizationActions.ownOrganizationIdsFetched({ids})),
          catchError((error: unknown) =>
            of(
              lab1OrganizationActions.organizationRequestFailed({
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
      ofType(lab1OrganizationActions.organizationRequestFailed),
      map(({error}) =>
        lab1RootActions.showHttpErrorAlert({
          error: (error.error as ErrorResponse) ?? error,
        }),
      ),
    );
  },
  {functional: true},
);
