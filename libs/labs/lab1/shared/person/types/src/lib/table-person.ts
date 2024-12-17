import type {Entity} from '@is/labs/lab1/shared/types';

import type {Color} from './color';
import type {Country} from './country';

export interface TablePerson extends Entity {
  locationId: number;
  name: string;
  eyeColor: Color;
  hairColor: Color;
  birthday: string;
  nationality: Country;
}
