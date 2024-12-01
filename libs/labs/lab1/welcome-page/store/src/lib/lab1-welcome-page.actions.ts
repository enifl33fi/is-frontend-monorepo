import {createActionGroup, props} from '@ngrx/store';

export const lab1WelcomePageActions = createActionGroup({
  source: 'welcome-page',
  events: {
    formSubmitted: props<{
      username: string;
    }>(),
  },
});
