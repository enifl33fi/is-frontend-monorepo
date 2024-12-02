import {createFeature, createReducer, on} from '@ngrx/store';

import {lab1RootActions, lab1RootFeatureKey} from './lab1-root.actions';
import type {RootState} from './root.state';

export const initialRootState = {
  loading: false,
};

export const rootStore = createFeature({
  name: lab1RootFeatureKey,
  reducer: createReducer<RootState>(
    initialRootState,
    on(
      lab1RootActions.setLoading,
      (state, {loading}): RootState => ({
        ...state,
        loading,
      }),
    ),
  ),
});
