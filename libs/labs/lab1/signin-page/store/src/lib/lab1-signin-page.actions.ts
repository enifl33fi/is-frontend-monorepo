import type {UserRequestDto} from '@is/labs/lab1/shared/user/dto';
import {createActionGroup, props} from '@ngrx/store';

export const lab1SigninPageActions = createActionGroup({
  source: 'signin-page',
  events: {
    formSubmitted: props<{
      user: UserRequestDto;
    }>(),
  },
});
