import type {Entity, FormEntity} from '@is/labs/lab1/shared/types';

import type {OrganizationBase} from './organization';

export interface OrganizationData extends OrganizationBase {
  officialAddressId: number;
}

export interface TableOrganization extends Entity, OrganizationData {}

export interface FormOrganization
  extends FormEntity,
    OrganizationData,
    Partial<Omit<Entity, 'hasAccess'>> {}
