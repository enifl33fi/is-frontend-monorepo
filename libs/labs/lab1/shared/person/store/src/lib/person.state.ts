import type {Person, TablePerson} from '@is/labs/lab1/shared/person/types';
import type {EntityQueryParams} from '@is/labs/lab1/shared/types';

export interface PersonState {
  persons: TablePerson[];
  selectedPerson: Person | null;
  dialogLoading: boolean;
  ownPersonIds: number[];
  queryParams: EntityQueryParams;
  totalElements: number;
  totalPages: number;
}
