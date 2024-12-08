import type {Tab} from '@is/labs/lab1/shared/root/types';
import {createActionGroup, emptyProps, props} from '@ngrx/store';

export const lab1RouterActions = createActionGroup({
  source: 'router',
  events: {
    navigateToWelcome: emptyProps(),
    navigateToSignUp: emptyProps(),
    navigateToSignIn: emptyProps(),
    navigateToHome: emptyProps(),
    navigateToTab: props<{tab: Tab}>(),
  },
});
