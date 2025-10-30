import {createFeature, createReducer, on} from '@ngrx/store';

import {
  lab1OrganizationActions,
  organizationFeatureKey,
} from './lab1-organization.actions';
import type {OrganizationState} from './organization.state';

export const initialOrganizationState: OrganizationState = {
  organizations: [],
  selectedOrganization: null,
  dialogLoading: false,
  ownOrganizationIds: [],
  queryParams: {},
  totalPages: 0,
  totalElements: 0,
};

export const organizationStore = createFeature({
  name: organizationFeatureKey,
  reducer: createReducer<OrganizationState>(
    initialOrganizationState,
    on(
      lab1OrganizationActions.organizationsFetched,
      (state, {response}): OrganizationState => ({
        ...state,
        organizations: response.content,
        totalElements: response.totalElements,
        totalPages: response.totalPages,
        queryParams: {
          ...state.queryParams,
          page: response.number,
          size: response.size,
        },
      }),
    ),
    on(
      lab1OrganizationActions.queryParamsUpdated,
      (state, {queryParams}): OrganizationState => ({
        ...state,
        queryParams,
      }),
    ),
    on(
      lab1OrganizationActions.setDialogLoading,
      (state, {dialogLoading}): OrganizationState => ({
        ...state,
        dialogLoading,
      }),
    ),
    on(
      lab1OrganizationActions.addOrganization,
      lab1OrganizationActions.updateOrganization,
      (state): OrganizationState => ({
        ...state,
        dialogLoading: true,
      }),
    ),
    on(
      lab1OrganizationActions.addOrganizationCompleted,
      lab1OrganizationActions.updateOrganizationCompleted,
      (state, {organization}): OrganizationState => ({
        ...state,
        dialogLoading: false,
        selectedOrganization: organization,
      }),
    ),
    on(
      lab1OrganizationActions.organizationByIdFetched,
      (state, {organization}): OrganizationState => ({
        ...state,
        selectedOrganization: organization,
      }),
    ),
    on(
      lab1OrganizationActions.organizationRequestFailed,
      (state): OrganizationState => ({
        ...state,
        dialogLoading: false,
      }),
    ),
    on(
      lab1OrganizationActions.showAddDialog,
      (state): OrganizationState => ({
        ...state,
        selectedOrganization: null,
      }),
    ),
    on(
      lab1OrganizationActions.ownOrganizationIdsFetched,
      (state, {ids}): OrganizationState => ({
        ...state,
        ownOrganizationIds: ids,
      }),
    ),
  ),
});
