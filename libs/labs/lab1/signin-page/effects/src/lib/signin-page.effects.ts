import {inject} from '@angular/core';
import {lab1UserActions} from '@is/labs/lab1/shared/user/store';
import {lab1SigninPageActions} from '@is/labs/lab1/signin-page/store';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {map} from 'rxjs';

export const formSubmitted$ = createEffect(
  (actions$ = inject(Actions)) => {
    return actions$.pipe(
      ofType(lab1SigninPageActions.formSubmitted),
      map(({user}) => lab1UserActions.login({user})),
    );
  },
  {
    functional: true,
  },
);
