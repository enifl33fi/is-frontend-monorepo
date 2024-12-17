import {importProvidersFrom} from '@angular/core';
import {StoreModule} from '@ngrx/store';

import {personStore} from './person.reducer';

export const personStoreProvider = importProvidersFrom(
  StoreModule.forFeature(personStore),
);
