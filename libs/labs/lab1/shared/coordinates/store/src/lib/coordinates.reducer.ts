import {createFeature, createReducer, on} from '@ngrx/store';

import type {CoordinatesState} from './coordinates.state';
import {coordinatesFeatureKey, lab1CoordinatesActions} from './lab1-coordinates.actions';

export const initialCoordinatesState: CoordinatesState = {
  coordinates: [],
  dialogLoading: false,
  selectedCoordinates: null,
  ownCoordinatesIds: [],
  queryParams: {},
  totalPages: 0,
  totalElements: 0,
};

export const coordinatesStore = createFeature({
  name: coordinatesFeatureKey,
  reducer: createReducer<CoordinatesState>(
    initialCoordinatesState,
    on(
      lab1CoordinatesActions.coordinatesFetched,
      (state, {response}): CoordinatesState => ({
        ...state,
        coordinates: response.content,
        totalElements: response.page.totalElements,
        totalPages: response.page.totalPages,
        queryParams: {
          ...state.queryParams,
          page: response.page.number,
          size: response.page.size,
        },
      }),
    ),
    on(
      lab1CoordinatesActions.queryParamsUpdated,
      (state, {queryParams}): CoordinatesState => ({
        ...state,
        queryParams,
      }),
    ),
    on(
      lab1CoordinatesActions.setDialogLoading,
      (state, {dialogLoading}): CoordinatesState => ({
        ...state,
        dialogLoading,
      }),
    ),
    on(
      lab1CoordinatesActions.addCoordinates,
      lab1CoordinatesActions.updateCoordinates,
      (state): CoordinatesState => ({
        ...state,
        dialogLoading: true,
      }),
    ),
    on(
      lab1CoordinatesActions.addCoordinatesCompleted,
      lab1CoordinatesActions.updateCoordinatesCompleted,
      (state, {coordinates}): CoordinatesState => ({
        ...state,
        dialogLoading: false,
        selectedCoordinates: coordinates,
      }),
    ),
    on(
      lab1CoordinatesActions.coordinatesByIdFetched,
      (state, {coordinates}): CoordinatesState => ({
        ...state,
        selectedCoordinates: coordinates,
      }),
    ),
    on(
      lab1CoordinatesActions.coordinatesRequestFailed,
      (state): CoordinatesState => ({
        ...state,
        dialogLoading: false,
      }),
    ),
    on(
      lab1CoordinatesActions.showAddDialog,
      (state): CoordinatesState => ({
        ...state,
        selectedCoordinates: null,
      }),
    ),
    on(
      lab1CoordinatesActions.ownCoordinatesIdsFetched,
      (state, {ids}): CoordinatesState => ({
        ...state,
        ownCoordinatesIds: ids,
      }),
    ),
  ),
});
