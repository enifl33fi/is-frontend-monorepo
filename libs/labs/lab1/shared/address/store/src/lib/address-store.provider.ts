import {importProvidersFrom} from '@angular/core';
import {StoreModule} from '@ngrx/store';

import {addressStore} from './address.reducer';

export const addressStoreProvider = importProvidersFrom(
  StoreModule.forFeature(addressStore),
);
