import type {Entity, FormEntity} from '@is/labs/lab1/shared/types';

import type {Color} from './color';
import type {Country} from './country';

export interface PersonData {
  locationId: number;
  name: string;
  eyeColor: Color;
  hairColor: Color;
  birthday: string;
  nationality: Country;
}

export interface TablePerson extends Entity, PersonData {}

export interface FormPerson
  extends FormEntity,
    PersonData,
    Partial<Omit<Entity, 'hasAccess'>> {}
