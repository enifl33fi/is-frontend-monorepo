import {createFeature, createReducer, on} from '@ngrx/store';

import {lab1LocationActions, locationFeatureKey} from './lab1-location.actions';
import type {LocationState} from './location.state';

export const initialLocationsState: LocationState = {
  locations: [],
};

export const locationStore = createFeature({
  name: locationFeatureKey,
  reducer: createReducer<LocationState>(
    initialLocationsState,
    on(
      lab1LocationActions.locationsFetched,
      (state, {locations}): LocationState => ({
        ...state,
        locations,
      }),
    ),
  ),
});
