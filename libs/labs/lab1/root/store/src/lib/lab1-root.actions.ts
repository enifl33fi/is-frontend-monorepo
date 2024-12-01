import type {AlertData} from '@is/labs/lab1/root/types';
import type {ErrorResponse} from '@is/labs/lab1/shared/types';
import {createActionGroup, props} from '@ngrx/store';

export const lab1RootFeatureKey = 'root';

export const lab1RootActions = createActionGroup({
  source: lab1RootFeatureKey,
  events: {
    showHttpErrorAlert: props<{error: ErrorResponse}>(),
    showAlert: props<{data: AlertData}>(),
    setLoading: props<{loading: boolean}>(),
  },
});
