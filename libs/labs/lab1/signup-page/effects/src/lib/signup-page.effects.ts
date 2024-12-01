import {inject} from '@angular/core';
import {lab1UserActions} from '@is/labs/lab1/shared/user/store';
import {lab1SignupPageActions} from '@is/labs/lab1/signup-page/store';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {map} from 'rxjs';

export const formSubmitted$ = createEffect(
  (actions$ = inject(Actions)) => {
    return actions$.pipe(
      ofType(lab1SignupPageActions.formSubmitted),
      map(({user}) => lab1UserActions.register({user})),
    );
  },
  {
    functional: true,
  },
);
