import type {Location} from '@is/labs/lab1/shared/location/types';
import type {EntityQueryParams} from '@is/labs/lab1/shared/types';

export interface LocationState {
  locations: Location[];
  selectedLocation: Location | null;
  dialogLoading: boolean;
  ownLocationIds: number[];
  queryParams: EntityQueryParams;
  totalElements: number;
  totalPages: number;
}
