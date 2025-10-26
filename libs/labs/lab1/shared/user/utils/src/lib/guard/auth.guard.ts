import {inject} from '@angular/core';
import type {CanActivateFn} from '@angular/router';
import {Router} from '@angular/router';
import {selectUser} from '@is/labs/lab1/shared/user/store';
import {Store} from '@ngrx/store';

export const authGuard: CanActivateFn = (route, state) => {
  const store = inject(Store);
  const router = inject(Router);
  const curUser = store.selectSignal(selectUser);

  if (curUser()) {
    router.navigate(['/lab1/home']);

    return false;
  }

  return true;
};
