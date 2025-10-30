import {HttpParams} from '@angular/common/http';
import type {EntityQueryParams} from '@is/labs/lab1/shared/types';

export function formHttpParamsFn(entityQueryParams: EntityQueryParams): HttpParams {
  let params = new HttpParams();

  // Добавляем filtersValues
  if (entityQueryParams.filtersValues) {
    Object.keys(entityQueryParams.filtersValues).forEach((key) => {
      const value = entityQueryParams.filtersValues?.[key];

      if (value) {
        params = params.append(`filtersValues[${key}]`, value);
      }
    });
  }

  // Добавляем остальные параметры
  if (entityQueryParams.sortBy && entityQueryParams.sortBy !== 'null') {
    params = params.append('sortBy', entityQueryParams.sortBy);
  }

  if (entityQueryParams.sortDirection !== undefined) {
    params = params.append('sortDirection', entityQueryParams.sortDirection.toString());
  }

  if (entityQueryParams.page !== undefined) {
    params = params.append('page', entityQueryParams.page.toString());
  }

  if (entityQueryParams.size !== undefined) {
    params = params.append('size', entityQueryParams.size.toString());
  }

  return params;
}
