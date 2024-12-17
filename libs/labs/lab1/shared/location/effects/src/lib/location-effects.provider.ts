import {importProvidersFrom} from '@angular/core';
import {EffectsModule} from '@ngrx/effects';

import * as locationEffects from './location.effects';

export const locationEffectsProvider = importProvidersFrom(
  EffectsModule.forFeature(locationEffects),
);
