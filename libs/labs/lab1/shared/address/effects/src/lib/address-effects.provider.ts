import {importProvidersFrom} from '@angular/core';
import {EffectsModule} from '@ngrx/effects';

import * as addressEffects from './address.effects';

export const addressEffectsProvider = importProvidersFrom(
  EffectsModule.forFeature(addressEffects),
);
