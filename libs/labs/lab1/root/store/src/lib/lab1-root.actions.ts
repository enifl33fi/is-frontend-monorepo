import type {AlertData} from '@is/labs/lab1/root/types';
import type {ErrorResponse} from '@is/labs/lab1/shared/types';
import {createActionGroup, props} from '@ngrx/store';

export const lab1RootActions = createActionGroup({
  source: 'root',
  events: {
    showHttpErrorAlert: props<{error: ErrorResponse}>(),
    showAlert: props<{data: AlertData}>(),
  },
});
