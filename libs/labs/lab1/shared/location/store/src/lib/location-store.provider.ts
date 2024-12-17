import {importProvidersFrom} from '@angular/core';
import {StoreModule} from '@ngrx/store';

import {locationStore} from './location.reducer';

export const locationStoreProvider = importProvidersFrom(
  StoreModule.forFeature(locationStore),
);
