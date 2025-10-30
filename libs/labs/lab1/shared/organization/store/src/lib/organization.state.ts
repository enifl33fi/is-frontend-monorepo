import type {
  Organization,
  TableOrganization,
} from '@is/labs/lab1/shared/organization/types';
import type {EntityQueryParams} from '@is/labs/lab1/shared/types';

export interface OrganizationState {
  organizations: TableOrganization[];
  selectedOrganization: Organization | null;
  dialogLoading: boolean;
  ownOrganizationIds: number[];
  queryParams: EntityQueryParams;
  totalElements: number;
  totalPages: number;
}
