import {createSelector} from '@ngrx/store';

import {personStore} from './person.reducer';

export const {
  selectPersons,
  selectDialogLoading,
  selectSelectedPerson,
  selectOwnPersonIds,
  selectQueryParams,
  selectTotalElements,
} = personStore;

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
