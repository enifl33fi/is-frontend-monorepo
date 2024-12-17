import {importProvidersFrom} from '@angular/core';
import {EffectsModule} from '@ngrx/effects';

import * as coordinatesEffects from './coordinates.effects';

export const coordinatesEffectsProvider = importProvidersFrom(
  EffectsModule.forFeature(coordinatesEffects),
);
