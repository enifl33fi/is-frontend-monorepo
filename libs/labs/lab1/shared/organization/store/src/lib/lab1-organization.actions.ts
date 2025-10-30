import type {HttpErrorResponse} from '@angular/common/http';
import type {
  FormOrganization,
  Organization,
  TableOrganization,
} from '@is/labs/lab1/shared/organization/types';
import type {EntityQueryParams, PageResponse} from '@is/labs/lab1/shared/types';
import {createActionGroup, emptyProps, props} from '@ngrx/store';

export const organizationFeatureKey = 'organization';

export const lab1OrganizationActions = createActionGroup({
  source: organizationFeatureKey,
  events: {
    organizationsFetched: props<{response: PageResponse<TableOrganization>}>(),
    organizationRequestFailed: props<{error: HttpErrorResponse}>(),
    fetchOrganizations: emptyProps(),
    fetchOrganizationById: props<{id: number}>(),
    fetchOwnOrganizationIds: emptyProps(),
    setDialogLoading: props<{dialogLoading: boolean}>(),
    addOrganization: props<{organization: FormOrganization}>(),
    updateOrganization: props<{organization: FormOrganization}>(),
    deleteOrganization: props<{id: number}>(),
    ownOrganizationIdsFetched: props<{ids: number[]}>(),
    organizationByIdFetched: props<{organization: Organization}>(),
    addOrganizationCompleted: props<{organization: Organization}>(),
    updateOrganizationCompleted: props<{organization: Organization}>(),
    deleteOrganizationCompleted: emptyProps(),
    showViewDialog: props<{id: number}>(),
    showAddDialog: emptyProps(),

    queryParamsFetched: props<{queryParams: EntityQueryParams}>(),
    queryParamsUpdated: props<{queryParams: EntityQueryParams}>(),
  },
});
