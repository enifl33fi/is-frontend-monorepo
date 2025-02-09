import type {Entity, FormEntity} from '@is/labs/lab1/shared/types';

export interface OrganizationData {
  officialAddressId: number;
  postalAddressId: number;
  name: string;
  annualTurnover: number;
  employeesCount: number;
  fullName: string;
  rating: number;
}

export interface TableOrganization extends Entity, OrganizationData {}

export interface FormOrganization
  extends FormEntity,
    OrganizationData,
    Partial<Omit<Entity, 'hasAccess'>> {}
