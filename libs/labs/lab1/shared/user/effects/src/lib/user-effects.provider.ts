import {importProvidersFrom} from '@angular/core';
import {EffectsModule} from '@ngrx/effects';

import * as userEffects from './user.effects';

export const userEffectsProvider = importProvidersFrom(
  EffectsModule.forFeature(userEffects),
);
