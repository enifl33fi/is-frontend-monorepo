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
    postalAddressId: organization.postalAddress.id,
    name: organization.name,
    annualTurnover: organization.annualTurnover,
    employeesCount: organization.employeesCount,
    fullName: organization.fullName,
    rating: organization.rating,
  };
}
