import type {UserRegisterRequestDto} from '@is/labs/lab1/shared/user/dto';
import {createActionGroup, props} from '@ngrx/store';

export const lab1SignupPageActions = createActionGroup({
  source: 'signup-page',
  events: {
    formSubmitted: props<{
      user: UserRegisterRequestDto;
    }>(),
  },
});
