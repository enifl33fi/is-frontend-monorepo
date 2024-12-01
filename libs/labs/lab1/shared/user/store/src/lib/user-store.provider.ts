import {importProvidersFrom} from '@angular/core';
import {StoreModule} from '@ngrx/store';

import {userStore} from './user.reducer';

export const userStoreProvider = importProvidersFrom(StoreModule.forFeature(userStore));
