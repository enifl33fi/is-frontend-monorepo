import {createActionGroup, emptyProps} from '@ngrx/store';

export const lab1RouterActions = createActionGroup({
  source: 'router',
  events: {
    navigateToSignUp: emptyProps(),
    navigateToSignIn: emptyProps(),
    navigateToHome: emptyProps(),
  },
});
