import {importProvidersFrom} from '@angular/core';
import {EffectsModule} from '@ngrx/effects';

import * as productEffects from './product.effects';

export const productEffectsProvider = importProvidersFrom(
  EffectsModule.forFeature(productEffects),
);
