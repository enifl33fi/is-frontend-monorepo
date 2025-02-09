import type {Entity, FormEntity} from '@is/labs/lab1/shared/types';

export interface AddressData {
  zipCode: string;
  townId: number;
}

export interface TableAddress extends Entity, AddressData {}

export interface FormAddress
  extends FormEntity,
    AddressData,
    Partial<Omit<Entity, 'hasAccess'>> {}
