import type {HttpErrorResponse} from '@angular/common/http';
import {inject, INJECTOR} from '@angular/core';
import {lab1RootActions} from '@is/labs/lab1/shared/root/store';
import {lab1RouterActions} from '@is/labs/lab1/shared/router/store';
import type {ErrorResponse} from '@is/labs/lab1/shared/types';
import {UserService, UserWsService} from '@is/labs/lab1/shared/user/data-access';
import {lab1UserActions, selectAccessToken} from '@is/labs/lab1/shared/user/store';
import type {AuthResponse} from '@is/labs/lab1/shared/user/types';
import {AdminReqDialogComponent} from '@is/labs/lab1/shared/user/ui';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {concatLatestFrom} from '@ngrx/operators';
import {Store} from '@ngrx/store';
import {TuiDialogService} from '@taiga-ui/core';
import {PolymorpheusComponent} from '@taiga-ui/polymorpheus';
import {catchError, filter, map, of, switchMap, take, tap} from 'rxjs';

export const registerUser$ = createEffect(
  (actions$ = inject(Actions), userService = inject(UserService)) => {
    return actions$.pipe(
      ofType(lab1UserActions.register),
      filter(({user}) => user.role === 'USER'),
      switchMap(({user}) => {
        return userService.registerUser(user).pipe(
          map((response) => lab1UserActions.authResponseFetched({response})),
          catchError((error: unknown) =>
            of(
              lab1UserActions.requestFailed({
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

export const registerAdmin$ = createEffect(
  (actions$ = inject(Actions), userService = inject(UserService)) => {
    return actions$.pipe(
      ofType(lab1UserActions.register),
      filter(({user}) => user.role === 'ADMIN'),
      switchMap(({user}) => {
        return userService.registerAdmin(user).pipe(
          map(() => lab1UserActions.adminRequestSentSuccessfully()),
          catchError((error: unknown) =>
            of(
              lab1UserActions.requestFailed({
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

export const login$ = createEffect(
  (actions$ = inject(Actions), userService = inject(UserService)) => {
    return actions$.pipe(
      ofType(lab1UserActions.login),
      switchMap(({user}) => {
        return userService.loginUser(user).pipe(
          map((response) => lab1UserActions.authResponseFetched({response})),
          catchError((error: unknown) =>
            of(
              lab1UserActions.requestFailed({
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

export const handleResponse$ = createEffect(
  (actions$ = inject(Actions), userService = inject(UserService)) => {
    return actions$.pipe(
      ofType(lab1UserActions.authResponseFetched),
      tap(({response}) => {
        userService.storeTokens(response.tokens);
        userService.storeUser(response.user);
      }),
      map(() => lab1RouterActions.navigateToHome()),
    );
  },
  {
    functional: true,
  },
);

export const handleRequestError$ = createEffect(
  (actions$ = inject(Actions)) => {
    return actions$.pipe(
      ofType(lab1UserActions.requestFailed),
      map(({error}) =>
        lab1RootActions.showHttpErrorAlert({
          error: (error.error as ErrorResponse) ?? error,
        }),
      ),
    );
  },
  {functional: true},
);

export const handleAdminResponse$ = createEffect(
  (actions$ = inject(Actions)) => {
    return actions$.pipe(
      ofType(lab1UserActions.adminRequestSentSuccessfully),
      map(() =>
        lab1RootActions.showAlert({
          data: {
            title: 'Success',
            description: 'Your request registered',
            type: 'success',
          },
        }),
      ),
    );
  },
  {functional: true},
);

export const disableLoading$ = createEffect(
  (actions$ = inject(Actions)) => {
    return actions$.pipe(
      ofType(
        lab1UserActions.adminRequestSentSuccessfully,
        lab1UserActions.requestFailed,
        lab1UserActions.authResponseFetched,
      ),
      map(() => lab1RootActions.setLoading({loading: false})),
    );
  },
  {functional: true},
);

export const logout$ = createEffect(
  (actions$ = inject(Actions), userService = inject(UserService)) => {
    return actions$.pipe(
      ofType(lab1UserActions.logout),
      tap(() => {
        userService.removeTokens();
        userService.removeUser();
      }),
      map(() => lab1RouterActions.navigateToWelcome()),
    );
  },
  {functional: true},
);

export const fetchSavedResponse$ = createEffect(
  (actions$ = inject(Actions), userService = inject(UserService)) => {
    return actions$.pipe(
      ofType(lab1RootActions.init),
      map(() => {
        return {
          tokens: userService.getTokens(),
          user: userService.getUser(),
        };
      }),
      filter((response) => !!response.tokens && !!response.user),
      map((response) =>
        lab1UserActions.authResponseSavedFetched({response: response as AuthResponse}),
      ),
    );
  },
  {functional: true},
);

export const initialFetchAdminRequests$ = createEffect(
  (
    actions$ = inject(Actions),
    store$ = inject(Store),
    userWsService = inject(UserWsService),
  ) => {
    return actions$.pipe(
      ofType(lab1UserActions.showRequests),
      concatLatestFrom(() => [store$.select(selectAccessToken)]),
      filter(([, accessToken]) => !!accessToken),
      take(1),
      tap(([, accessToken]) => userWsService.wsConnect(accessToken ?? '')),
      map(() => lab1UserActions.fetchAdminRequests()),
    );
  },
  {
    functional: true,
  },
);

export const showAdminRequestsDialog$ = createEffect(
  (
    actions$ = inject(Actions),
    dialogs = inject(TuiDialogService),
    injector = inject(INJECTOR),
  ) => {
    return actions$.pipe(
      ofType(lab1UserActions.showRequests),
      switchMap(() => {
        return dialogs.open(
          new PolymorpheusComponent(AdminReqDialogComponent, injector),
          {
            closeable: true,
            dismissible: true,
            size: 's',
            label: 'Admin registration requests',
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

export const fetchAdminRequests$ = createEffect(
  (actions$ = inject(Actions), userService = inject(UserService)) => {
    return actions$.pipe(
      ofType(lab1UserActions.fetchAdminRequests),
      switchMap(() => {
        return userService.getAdminRequests().pipe(
          map((requests) => lab1UserActions.adminRequestsFetched({requests})),
          catchError((error: unknown) =>
            of(
              lab1UserActions.requestFailed({
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

export const approveRequest$ = createEffect(
  (actions$ = inject(Actions), userService = inject(UserService)) => {
    return actions$.pipe(
      ofType(lab1UserActions.approveRequest),
      switchMap(({request}) => {
        return userService.approveAdminRequests(request).pipe(
          map(() => lab1UserActions.approveRequestCompleted()),
          catchError((error: unknown) =>
            of(
              lab1UserActions.requestFailed({
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

export const rejectRequest$ = createEffect(
  (actions$ = inject(Actions), userService = inject(UserService)) => {
    return actions$.pipe(
      ofType(lab1UserActions.rejectRequest),
      switchMap(({request}) => {
        return userService.rejectAdminRequests(request).pipe(
          map(() => lab1UserActions.rejectRequestCompleted()),
          catchError((error: unknown) =>
            of(
              lab1UserActions.requestFailed({
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

export const showSuccessAdminAlert$ = createEffect(
  (actions$ = inject(Actions)) => {
    return actions$.pipe(
      ofType(
        lab1UserActions.approveRequestCompleted,
        lab1UserActions.rejectRequestCompleted,
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
