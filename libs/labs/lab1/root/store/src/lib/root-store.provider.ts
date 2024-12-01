import {importProvidersFrom} from '@angular/core';
import {StoreModule} from '@ngrx/store';

import {rootStore} from './root.reducer';

export const rootStoreProvider = importProvidersFrom(StoreModule.forFeature(rootStore));
