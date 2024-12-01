import {inject} from '@angular/core';
import {lab1UserActions} from '@is/labs/lab1/shared/user/store';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {tap} from 'rxjs';

export const handleRawUsername$ = createEffect(
  (actions$ = inject(Actions)) => {
    return actions$.pipe(
      ofType(lab1UserActions.rawUsernameFetched),
      // TODO: Убрать
      // eslint-disable-next-line no-console
      tap(() => console.log('pass')),
    );
  },
  {
    functional: true,
    dispatch: false,
  },
);
