import {createFeature, createReducer, on} from '@ngrx/store';

import {lab1LocationActions, locationFeatureKey} from './lab1-location.actions';
import type {LocationState} from './location.state';

export const initialLocationsState: LocationState = {
  locations: [],
  selectedLocation: null,
  dialogLoading: false,
  ownLocationIds: [],
  queryParams: {},
  totalPages: 0,
  totalElements: 0,
};

export const locationStore = createFeature({
  name: locationFeatureKey,
  reducer: createReducer<LocationState>(
    initialLocationsState,
    on(
      lab1LocationActions.locationsFetched,
      (state, {response}): LocationState => ({
        ...state,
        locations: response.content,
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
      lab1LocationActions.queryParamsUpdated,
      (state, {queryParams}): LocationState => ({
        ...state,
        queryParams,
      }),
    ),
    on(
      lab1LocationActions.setDialogLoading,
      (state, {dialogLoading}): LocationState => ({
        ...state,
        dialogLoading,
      }),
    ),
    on(
      lab1LocationActions.addLocation,
      lab1LocationActions.updateLocation,
      (state): LocationState => ({
        ...state,
        dialogLoading: true,
      }),
    ),

    on(
      lab1LocationActions.addLocationCompleted,
      lab1LocationActions.updateLocationCompleted,
      (state, {location}): LocationState => ({
        ...state,
        dialogLoading: false,
        selectedLocation: location,
      }),
    ),
    on(
      lab1LocationActions.locationByIdFetched,
      (state, {location}): LocationState => ({
        ...state,
        selectedLocation: location,
      }),
    ),
    on(
      lab1LocationActions.locationRequestFailed,
      (state): LocationState => ({
        ...state,
        dialogLoading: false,
      }),
    ),
    on(
      lab1LocationActions.showAddDialog,
      (state): LocationState => ({
        ...state,
        selectedLocation: null,
      }),
    ),
    on(
      lab1LocationActions.ownLocationIdsFetched,
      (state, {ids}): LocationState => ({
        ...state,
        ownLocationIds: ids,
      }),
    ),
  ),
});
