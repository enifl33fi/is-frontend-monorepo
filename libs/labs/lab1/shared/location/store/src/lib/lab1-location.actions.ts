import type {HttpErrorResponse} from '@angular/common/http';
import type {FormLocation, Location} from '@is/labs/lab1/shared/location/types';
import type {EntityQueryParams, PageResponse} from '@is/labs/lab1/shared/types';
import {createActionGroup, emptyProps, props} from '@ngrx/store';

export const locationFeatureKey = 'location';

export const lab1LocationActions = createActionGroup({
  source: locationFeatureKey,
  events: {
    fetchLocations: emptyProps(),
    fetchLocationById: props<{id: number}>(),
    fetchOwnLocationIds: emptyProps(),
    locationsFetched: props<{response: PageResponse<Location>}>(),
    locationRequestFailed: props<{error: HttpErrorResponse}>(),
    setDialogLoading: props<{dialogLoading: boolean}>(),
    addLocation: props<{location: FormLocation}>(),
    updateLocation: props<{location: FormLocation}>(),
    deleteLocation: props<{id: number}>(),
    ownLocationIdsFetched: props<{ids: number[]}>(),
    locationByIdFetched: props<{location: Location}>(),
    addLocationCompleted: props<{location: Location}>(),
    updateLocationCompleted: props<{location: Location}>(),
    deleteLocationCompleted: emptyProps(),
    showViewDialog: props<{id: number}>(),
    showAddDialog: emptyProps(),

    queryParamsFetched: props<{queryParams: EntityQueryParams}>(),
    queryParamsUpdated: props<{queryParams: EntityQueryParams}>(),
  },
});
