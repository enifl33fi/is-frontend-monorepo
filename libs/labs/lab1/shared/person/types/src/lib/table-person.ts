import type {Entity, FormEntity} from '@is/labs/lab1/shared/types';

import type {PersonBase} from './person';

export interface PersonData extends PersonBase {
  locationId: number | null;
}

export interface TablePerson extends Entity, PersonData {}

export interface FormPerson
  extends FormEntity,
    PersonData,
    Partial<Omit<Entity, 'hasAccess'>> {}
