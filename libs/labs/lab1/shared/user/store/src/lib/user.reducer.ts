import {createFeature, createReducer, on} from '@ngrx/store';

import {lab1UserActions, userFeatureKey} from './lab1-user.actions';
import type {UserState} from './user.state';

export const initialUserState = {
  rawUsername: '',
};

export const userStore = createFeature({
  name: userFeatureKey,
  reducer: createReducer<UserState>(
    initialUserState,
    on(
      lab1UserActions.rawUsernameFetched,
      (state, {username}): UserState => ({
        ...state,
        rawUsername: username,
      }),
    ),
  ),
});