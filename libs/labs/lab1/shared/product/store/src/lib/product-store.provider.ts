import {importProvidersFrom} from '@angular/core';
import {StoreModule} from '@ngrx/store';

import {productStore} from './product.reducer';

export const productStoreProvider = importProvidersFrom(
  StoreModule.forFeature(productStore),
);
