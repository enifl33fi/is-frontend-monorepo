import {importProvidersFrom} from '@angular/core';
import {StoreModule} from '@ngrx/store';

import {organizationStore} from './organization.reducer';

export const organizationStoreProvider = importProvidersFrom(
  StoreModule.forFeature(organizationStore),
);
