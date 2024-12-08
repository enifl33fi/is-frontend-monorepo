import type {Location} from '@is/labs/lab1/shared/location/types';
import type {Entity} from '@is/labs/lab1/shared/types';

export interface Address extends Entity {
  zipCode: string;
  town: Location;
}
