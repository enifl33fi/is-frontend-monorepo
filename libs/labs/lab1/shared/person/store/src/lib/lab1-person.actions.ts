import type {HttpErrorResponse} from '@angular/common/http';
import type {TablePerson} from '@is/labs/lab1/shared/person/types';
import {createActionGroup, emptyProps, props} from '@ngrx/store';

export const personFeatureKey = 'person';

export const lab1PersonActions = createActionGroup({
  source: personFeatureKey,
  events: {
    personsFetched: props<{persons: TablePerson[]}>(),
    personFetchFailed: props<{error: HttpErrorResponse}>(),
    fetchPersons: emptyProps(),
  },
});
