import {createFeature, createReducer, on} from '@ngrx/store';

import {
  lab1OrganizationActions,
  organizationFeatureKey,
} from './lab1-organization.actions';
import type {OrganizationState} from './organization.state';

export const initialOrganizationState: OrganizationState = {
  organizations: [],
};

export const organizationStore = createFeature({
  name: organizationFeatureKey,
  reducer: createReducer<OrganizationState>(
    initialOrganizationState,
    on(
      lab1OrganizationActions.organizationsFetched,
      (state, {organizations}): OrganizationState => ({
        ...state,
        organizations,
      }),
    ),
  ),
});
