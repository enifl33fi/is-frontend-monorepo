import type {
  Organization,
  TableOrganization,
} from '@is/labs/lab1/shared/organization/types';

export interface OrganizationState {
  organizations: TableOrganization[];
  selectedOrganization: Organization | null;
  dialogLoading: boolean;
  ownOrganizationIds: number[];
}
