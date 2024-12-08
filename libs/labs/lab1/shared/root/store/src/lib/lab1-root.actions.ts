import type {AlertData, Tab} from '@is/labs/lab1/shared/root/types';
import type {ErrorResponse} from '@is/labs/lab1/shared/types';
import {createActionGroup, emptyProps, props} from '@ngrx/store';

export const lab1RootFeatureKey = 'root';

export const lab1RootActions = createActionGroup({
  source: lab1RootFeatureKey,
  events: {
    init: emptyProps(),
    showHttpErrorAlert: props<{error: ErrorResponse}>(),
    showAlert: props<{data: AlertData}>(),
    setLoading: props<{loading: boolean}>(),
    setActiveTab: props<{activeTab: Tab}>(),
  },
});
