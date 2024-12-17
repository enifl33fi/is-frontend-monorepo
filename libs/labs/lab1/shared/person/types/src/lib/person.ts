import type {Location} from '@is/labs/lab1/shared/location/types';
import type {Entity} from '@is/labs/lab1/shared/types';

import type {Color} from './color';
import type {Country} from './country';

export interface Person extends Entity {
  location: Location;
  name: string;
  eyeColor: Color;
  hairColor: Color;
  birthday: string;
  nationality: Country;
}
