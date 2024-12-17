import type {HttpErrorResponse} from '@angular/common/http';
import type {TableOrganization} from '@is/labs/lab1/shared/organization/types';
import {createActionGroup, emptyProps, props} from '@ngrx/store';

export const organizationFeatureKey = 'organization';

export const lab1OrganizationActions = createActionGroup({
  source: organizationFeatureKey,
  events: {
    organizationsFetched: props<{organizations: TableOrganization[]}>(),
    organizationFetchFailed: props<{error: HttpErrorResponse}>(),
    fetchOrganizations: emptyProps(),
  },
});
