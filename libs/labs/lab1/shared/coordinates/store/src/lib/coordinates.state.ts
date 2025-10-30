import type {Coordinates} from '@is/labs/lab1/shared/coordinates/types';
import type {EntityQueryParams} from '@is/labs/lab1/shared/types';

export interface CoordinatesState {
  coordinates: Coordinates[];
  dialogLoading: boolean;
  selectedCoordinates: Coordinates | null;
  ownCoordinatesIds: number[];
  queryParams: EntityQueryParams;
  totalElements: number;
  totalPages: number;
}
