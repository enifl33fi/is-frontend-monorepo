import {createSelector} from '@ngrx/store';

import {coordinatesStore} from './coordinates.reducer';

export const {
  selectCoordinates,
  selectDialogLoading,
  selectSelectedCoordinates,
  selectOwnCoordinatesIds,
  selectQueryParams,
  selectTotalElements,
} = coordinatesStore;

export const selectPage = createSelector(
  selectQueryParams,
  (queryParams) => queryParams.page ?? 0,
);

export const selectSize = createSelector(
  selectQueryParams,
  (queryParams) => queryParams.size ?? 10,
);

export const selectFiltersValues = createSelector(
  selectQueryParams,
  (queryParams) => queryParams.filtersValues ?? {},
);

export const selectSortBy = createSelector(
  selectQueryParams,
  (queryParams) => queryParams.sortBy ?? 'id',
);

export const selectSortDirection = createSelector(
  selectQueryParams,
  (queryParams) => queryParams.sortDirection ?? 1,
);
