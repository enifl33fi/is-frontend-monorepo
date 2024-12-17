import {createFeature, createReducer, on} from '@ngrx/store';

import type {CoordinatesState} from './coordinates.state';
import {coordinatesFeatureKey, lab1CoordinatesActions} from './lab1-coordinates.actions';

export const initialCoordinatesState: CoordinatesState = {
  coordinates: [],
};

export const coordinatesStore = createFeature({
  name: coordinatesFeatureKey,
  reducer: createReducer<CoordinatesState>(
    initialCoordinatesState,
    on(
      lab1CoordinatesActions.coordinatesFetched,
      (state, {coordinates}): CoordinatesState => ({
        ...state,
        coordinates,
      }),
    ),
  ),
});
