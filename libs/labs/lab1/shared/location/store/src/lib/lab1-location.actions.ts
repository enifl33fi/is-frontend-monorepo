import type {HttpErrorResponse} from '@angular/common/http';
import type {Location} from '@is/labs/lab1/shared/location/types';
import {createActionGroup, emptyProps, props} from '@ngrx/store';

export const locationFeatureKey = 'location';

export const lab1LocationActions = createActionGroup({
  source: locationFeatureKey,
  events: {
    fetchLocations: emptyProps(),
    locationsFetched: props<{locations: Location[]}>(),
    locationFetchFailed: props<{error: HttpErrorResponse}>(),
  },
});
