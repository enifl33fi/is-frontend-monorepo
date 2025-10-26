import type {Location} from '@is/labs/lab1/shared/location/types';
import type {Entity} from '@is/labs/lab1/shared/types';

export interface AddressBase {
  zipCode: string;
}

export interface Address extends Entity, AddressBase {
  town: Location | null;
}
