import type {Coordinates} from '@is/labs/lab1/shared/coordinates/types';

export interface CoordinatesState {
  coordinates: Coordinates[];
  dialogLoading: boolean;
  selectedCoordinates: Coordinates | null;
  ownCoordinatesIds: number[];
}
