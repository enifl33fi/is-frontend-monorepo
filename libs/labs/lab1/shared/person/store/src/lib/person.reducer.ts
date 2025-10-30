import {createFeature, createReducer, on} from '@ngrx/store';

import {lab1PersonActions, personFeatureKey} from './lab1-person.actions';
import type {PersonState} from './person.state';

export const initialPersonState: PersonState = {
  persons: [],
  selectedPerson: null,
  dialogLoading: false,
  ownPersonIds: [],
  queryParams: {},
  totalPages: 0,
  totalElements: 0,
};

export const personStore = createFeature({
  name: personFeatureKey,
  reducer: createReducer<PersonState>(
    initialPersonState,
    on(
      lab1PersonActions.personsFetched,
      (state, {response}): PersonState => ({
        ...state,
        persons: response.content,
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
      lab1PersonActions.queryParamsUpdated,
      (state, {queryParams}): PersonState => ({
        ...state,
        queryParams,
      }),
    ),
    on(
      lab1PersonActions.setDialogLoading,
      (state, {dialogLoading}): PersonState => ({
        ...state,
        dialogLoading,
      }),
    ),
    on(
      lab1PersonActions.addPerson,
      lab1PersonActions.updatePerson,
      (state): PersonState => ({
        ...state,
        dialogLoading: true,
      }),
    ),
    on(
      lab1PersonActions.addPersonCompleted,
      lab1PersonActions.updatePersonCompleted,
      (state, {person}): PersonState => ({
        ...state,
        dialogLoading: false,
        selectedPerson: person,
      }),
    ),
    on(
      lab1PersonActions.personByIdFetched,
      (state, {person}): PersonState => ({
        ...state,
        selectedPerson: person,
      }),
    ),
    on(
      lab1PersonActions.personRequestFailed,
      (state): PersonState => ({
        ...state,
        dialogLoading: false,
      }),
    ),
    on(
      lab1PersonActions.showAddDialog,
      (state): PersonState => ({
        ...state,
        selectedPerson: null,
      }),
    ),
    on(
      lab1PersonActions.ownPersonIdsFetched,
      (state, {ids}): PersonState => ({
        ...state,
        ownPersonIds: ids,
      }),
    ),
  ),
});
