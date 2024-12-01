import {inject} from '@angular/core';
import {lab1RouterActions} from '@is/labs/lab1/shared/router/store';
import {lab1UserActions} from '@is/labs/lab1/shared/user/store';
import {lab1WelcomePageActions} from '@is/labs/lab1/welcome-page/store';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {map} from 'rxjs';

export const rawUsernameFetched$ = createEffect(
  (actions$ = inject(Actions)) => {
    return actions$.pipe(
      ofType(lab1WelcomePageActions.formSubmitted),
      map(({username}) => lab1UserActions.rawUsernameFetched({username})),
    );
  },
  {functional: true},
);

export const navigateToSignUp$ = createEffect(
  (actions$ = inject(Actions)) => {
    return actions$.pipe(
      ofType(lab1WelcomePageActions.formSubmitted),
      map(() => lab1RouterActions.navigateToSignUp()),
    );
  },
  {functional: true},
);
