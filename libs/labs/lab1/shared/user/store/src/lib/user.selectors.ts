import {createSelector} from '@ngrx/store';

import {userStore} from './user.reducer';

export const {selectRawUsername, selectUser, selectTokens} = userStore;

export const selectAccessToken = createSelector(selectTokens, (tokens) => tokens?.access);

export const selectRefreshToken = createSelector(
  selectTokens,
  (tokens) => tokens?.refresh,
);
