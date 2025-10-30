import type {HttpErrorResponse} from '@angular/common/http';
import type {Coordinates, FormCoordinates} from '@is/labs/lab1/shared/coordinates/types';
import type {EntityQueryParams, PageResponse} from '@is/labs/lab1/shared/types';
import {createActionGroup, emptyProps, props} from '@ngrx/store';

export const coordinatesFeatureKey = 'coordinates';

export const lab1CoordinatesActions = createActionGroup({
  source: coordinatesFeatureKey,
  events: {
    fetchCoordinates: emptyProps(),
    fetchCoordinatesById: props<{id: number}>(),
    coordinatesFetched: props<{response: PageResponse<Coordinates>}>(),
    coordinatesRequestFailed: props<{error: HttpErrorResponse}>(),
    fetchOwnCoordinatesIds: emptyProps(),
    setDialogLoading: props<{dialogLoading: boolean}>(),
    addCoordinates: props<{coordinates: FormCoordinates}>(),
    updateCoordinates: props<{coordinates: FormCoordinates}>(),
    deleteCoordinates: props<{id: number}>(),
    ownCoordinatesIdsFetched: props<{ids: number[]}>(),
    coordinatesByIdFetched: props<{coordinates: Coordinates}>(),
    addCoordinatesCompleted: props<{coordinates: Coordinates}>(),
    updateCoordinatesCompleted: props<{coordinates: Coordinates}>(),
    deleteCoordinatesCompleted: emptyProps(),
    showViewDialog: props<{id: number}>(),
    showAddDialog: emptyProps(),

    queryParamsFetched: props<{queryParams: EntityQueryParams}>(),
    queryParamsUpdated: props<{queryParams: EntityQueryParams}>(),
  },
});
