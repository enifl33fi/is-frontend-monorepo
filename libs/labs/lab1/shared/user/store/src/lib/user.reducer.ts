import {createFeature, createReducer, on} from '@ngrx/store';

import {lab1UserActions, userFeatureKey} from './lab1-user.actions';
import type {UserState} from './user.state';

export const initialUserState: UserState = {
  rawUsername: '',
  user: null,
  tokens: null,
  adminRequests: [],
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
    on(
      lab1UserActions.authResponseFetched,
      lab1UserActions.authResponseSavedFetched,
      (state, {response}): UserState => ({
        ...state,
        user: response.user,
        tokens: response.tokens,
      }),
    ),
    on(
      lab1UserActions.logout,
      (state): UserState => ({
        ...state,
        user: null,
        tokens: null,
      }),
    ),
    on(
      lab1UserActions.adminRequestsFetched,
      (state, {requests}): UserState => ({
        ...state,
        adminRequests: requests,
      }),
    ),
  ),
});
