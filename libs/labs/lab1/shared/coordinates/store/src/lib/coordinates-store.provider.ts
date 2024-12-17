import {importProvidersFrom} from '@angular/core';
import {StoreModule} from '@ngrx/store';

import {coordinatesStore} from './coordinates.reducer';

export const coordinatesStoreProvider = importProvidersFrom(
  StoreModule.forFeature(coordinatesStore),
);
