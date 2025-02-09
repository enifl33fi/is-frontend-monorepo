import type {HttpErrorResponse} from '@angular/common/http';
import type {FormPerson, Person, TablePerson} from '@is/labs/lab1/shared/person/types';
import {createActionGroup, emptyProps, props} from '@ngrx/store';

export const personFeatureKey = 'person';

export const lab1PersonActions = createActionGroup({
  source: personFeatureKey,
  events: {
    personsFetched: props<{persons: TablePerson[]}>(),
    personRequestFailed: props<{error: HttpErrorResponse}>(),
    fetchPersons: emptyProps(),
    fetchPersonById: props<{id: number}>(),
    fetchOwnPersonIds: emptyProps(),
    setDialogLoading: props<{dialogLoading: boolean}>(),
    addPerson: props<{person: FormPerson}>(),
    updatePerson: props<{person: FormPerson}>(),
    deletePerson: props<{id: number}>(),
    ownPersonIdsFetched: props<{ids: number[]}>(),
    personByIdFetched: props<{person: Person}>(),
    addPersonCompleted: props<{person: Person}>(),
    updatePersonCompleted: props<{person: Person}>(),
    deletePersonCompleted: emptyProps(),
    showViewDialog: props<{id: number}>(),
    showAddDialog: emptyProps(),
  },
});
