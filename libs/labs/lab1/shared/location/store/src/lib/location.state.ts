import type {Location} from '@is/labs/lab1/shared/location/types';

export interface LocationState {
  locations: Location[];
  selectedLocation: Location | null;
  dialogLoading: boolean;
  ownLocationIds: number[];
}
