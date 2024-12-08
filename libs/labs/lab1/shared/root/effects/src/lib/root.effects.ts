import {inject} from '@angular/core';
import {Router} from '@angular/router';
import {lab1RootActions} from '@is/labs/lab1/shared/root/store';
import {lab1RouterActions} from '@is/labs/lab1/shared/router/store';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {TuiAlertService} from '@taiga-ui/core';
import {map, switchMap, takeUntil} from 'rxjs';

export const showHttpErrorAlert$ = createEffect(
  (actions$ = inject(Actions)) => {
    return actions$.pipe(
      ofType(lab1RootActions.showHttpErrorAlert),
      map(({error}) =>
        error.status
          ? lab1RootActions.showAlert({
              data: {
                title: `${error.status}: ${error.statusText ?? 'Unknown'}`,
                description: error.message,
                type: 'error',
              },
            })
          : lab1RootActions.showAlert({
              data: {
                title: 'Connection error',
                description: 'Unable to connect with server',
                type: 'error',
              },
            }),
      ),
    );
  },
  {functional: true},
);

export const showAlert$ = createEffect(
  (
    actions$ = inject(Actions),
    alertService = inject(TuiAlertService),
    router = inject(Router),
  ) => {
    return actions$.pipe(
      ofType(lab1RootActions.showAlert),
      switchMap(({data}) => {
        return alertService
          .open(data.description, {
            autoClose: 3000,
            closeable: true,
            label: data.title,
            appearance: data.type,
          })
          .pipe(takeUntil(router.events));
      }),
    );
  },
  {
    functional: true,
    dispatch: false,
  },
);

export const navigateToTab$ = createEffect(
  (actions$ = inject(Actions)) => {
    return actions$.pipe(
      ofType(lab1RootActions.setActiveTab),
      map(({activeTab}) => lab1RouterActions.navigateToTab({tab: activeTab})),
    );
  },
  {functional: true},
);
