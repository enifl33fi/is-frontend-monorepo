import type {HttpErrorResponse} from '@angular/common/http';
import type {Coordinates} from '@is/labs/lab1/shared/coordinates/types';
import {createActionGroup, emptyProps, props} from '@ngrx/store';

export const coordinatesFeatureKey = 'coordinates';

export const lab1CoordinatesActions = createActionGroup({
  source: coordinatesFeatureKey,
  events: {
    fetchCoordinates: emptyProps(),
    coordinatesFetched: props<{coordinates: Coordinates[]}>(),
    coordinatesFetchFailed: props<{error: HttpErrorResponse}>(),
  },
});
