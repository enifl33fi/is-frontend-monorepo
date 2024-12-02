import {createActionGroup, emptyProps} from '@ngrx/store';

export const lab1RouterActions = createActionGroup({
  source: 'router',
  events: {
    navigateToWelcome: emptyProps(),
    navigateToSignUp: emptyProps(),
    navigateToSignIn: emptyProps(),
    navigateToHome: emptyProps(),
  },
});
