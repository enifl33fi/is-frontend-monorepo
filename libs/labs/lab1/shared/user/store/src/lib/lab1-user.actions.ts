import {createActionGroup, props} from '@ngrx/store';

export const userFeatureKey = 'user';

export const lab1UserActions = createActionGroup({
  source: userFeatureKey,
  events: {
    rawUsernameFetched: props<{
      username: string;
    }>(),
  },
});
