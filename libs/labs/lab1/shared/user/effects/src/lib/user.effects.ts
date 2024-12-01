import {inject} from '@angular/core';
import {lab1RootActions} from '@is/labs/lab1/root/store';
import {lab1RouterActions} from '@is/labs/lab1/shared/router/store';
import type {ErrorResponse} from '@is/labs/lab1/shared/types';
import {UserService} from '@is/labs/lab1/shared/user/data-access';
import {lab1UserActions} from '@is/labs/lab1/shared/user/store';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, filter, map, of, switchMap, tap} from 'rxjs';

export const registerUser$ = createEffect(
  (actions$ = inject(Actions), userService = inject(UserService)) => {
    return actions$.pipe(
      ofType(lab1UserActions.register),
      filter(({user}) => user.role === 'USER'),
      switchMap(({user}) => {
        return userService.registerUser(user).pipe(
          map((response) => lab1UserActions.authResponseFetched({response})),
          catchError((error: unknown) =>
            of(lab1UserActions.requestFailed({error: error as ErrorResponse})),
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
            of(lab1UserActions.requestFailed({error: error as ErrorResponse})),
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
            of(lab1UserActions.requestFailed({error: error as ErrorResponse})),
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
      map(({error}) => lab1RootActions.showHttpErrorAlert({error})),
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
