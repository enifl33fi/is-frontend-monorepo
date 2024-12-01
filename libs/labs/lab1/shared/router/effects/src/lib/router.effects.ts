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