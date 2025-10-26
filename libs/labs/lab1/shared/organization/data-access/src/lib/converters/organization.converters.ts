import type {
  Organization,
  TableOrganization,
} from '@is/labs/lab1/shared/organization/types';

export function convertOrganizationToOrganizationTable(
  organization: Organization,
): TableOrganization {
  return {
    id: organization.id,
    hasAccess: organization.hasAccess,
    officialAddressId: organization.officialAddress.id,
    name: organization.name,
    annualTurnover: organization.annualTurnover,
    employeesCount: organization.employeesCount,
    type: organization.type,
    rating: organization.rating,
    creationDate: organization.creationDate,
  };
}
