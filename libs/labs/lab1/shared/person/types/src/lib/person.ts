import type {Location} from '@is/labs/lab1/shared/location/types';
import type {Entity} from '@is/labs/lab1/shared/types';

import type {Color} from './color';
import type {Country} from './country';

export interface PersonBase {
  name: string;
  eyeColor: Color;
  hairColor: Color | null;
  weight: number | null;
  nationality: Country;
}

export interface Person extends Entity, PersonBase {
  location: Location | null;
}
