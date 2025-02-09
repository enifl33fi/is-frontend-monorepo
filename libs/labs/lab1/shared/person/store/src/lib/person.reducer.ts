import {createFeature, createReducer, on} from '@ngrx/store';

import {lab1PersonActions, personFeatureKey} from './lab1-person.actions';
import type {PersonState} from './person.state';

export const initialPersonState: PersonState = {
  persons: [],
  selectedPerson: null,
  dialogLoading: false,
  ownPersonIds: [],
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
