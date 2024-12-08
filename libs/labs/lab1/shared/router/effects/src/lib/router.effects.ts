import {inject} from '@angular/core';
import {Router} from '@angular/router';
import {lab1RouterActions} from '@is/labs/lab1/shared/router/store';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {tap} from 'rxjs';

export const navigateToSignUp$ = createEffect(
  (actions$ = inject(Actions), router = inject(Router)) => {
    return actions$.pipe(
      ofType(lab1RouterActions.navigateToSignUp),
      tap(() => {
        void router.navigate(['lab1', 'signup']);
      }),
    );
  },
  {functional: true, dispatch: false},
);

export const navigateToSignIn$ = createEffect(
  (actions$ = inject(Actions), router = inject(Router)) => {
    return actions$.pipe(
      ofType(lab1RouterActions.navigateToSignIn),
      tap(() => {
        void router.navigate(['lab1', 'signin']);
      }),
    );
  },
  {functional: true, dispatch: false},
);

export const navigateToWelcome$ = createEffect(
  (actions$ = inject(Actions), router = inject(Router)) => {
    return actions$.pipe(
      ofType(lab1RouterActions.navigateToWelcome),
      tap(() => {
        void router.navigate(['lab1']);
      }),
    );
  },
  {functional: true, dispatch: false},
);

export const navigateToHome = createEffect(
  (actions$ = inject(Actions), router = inject(Router)) => {
    return actions$.pipe(
      ofType(lab1RouterActions.navigateToHome),
      tap(() => {
        void router.navigate(['lab1', 'home']);
      }),
    );
  },
  {functional: true, dispatch: false},
);

export const navigateToTab$ = createEffect(
  (actions$ = inject(Actions), router = inject(Router)) => {
    return actions$.pipe(
      ofType(lab1RouterActions.navigateToTab),
      tap(({tab}) => {
        void router.navigate(['lab1', 'home', tab]);
      }),
    );
  },
  {functional: true, dispatch: false},
);
