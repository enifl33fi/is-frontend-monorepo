import {createFeature, createReducer, on} from '@ngrx/store';

import {lab1PersonActions, personFeatureKey} from './lab1-person.actions';
import type {PersonState} from './person.state';

export const initialPersonState: PersonState = {
  persons: [],
};

export const personStore = createFeature({
  name: personFeatureKey,
  reducer: createReducer<PersonState>(
    initialPersonState,
    on(
      lab1PersonActions.personsFetched,
      (state, {persons}): PersonState => ({
        ...state,
        persons,
      }),
    ),
  ),
});
