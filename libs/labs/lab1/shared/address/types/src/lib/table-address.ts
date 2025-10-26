import type {Entity, FormEntity} from '@is/labs/lab1/shared/types';

import type {AddressBase} from './address';

export interface AddressData extends AddressBase {
  townId: number | null;
}

export interface TableAddress extends Entity, AddressData {}

export interface FormAddress
  extends FormEntity,
    AddressData,
    Partial<Omit<Entity, 'hasAccess'>> {}
