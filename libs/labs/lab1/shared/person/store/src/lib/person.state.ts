import type {Person, TablePerson} from '@is/labs/lab1/shared/person/types';

export interface PersonState {
  persons: TablePerson[];
  selectedPerson: Person | null;
  dialogLoading: boolean;
  ownPersonIds: number[];
}
