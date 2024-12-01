import {importProvidersFrom} from '@angular/core';
import {EffectsModule} from '@ngrx/effects';

import * as rootEffects from './root.effects';

export const rootEffectsProvider = importProvidersFrom(
  EffectsModule.forFeature(rootEffects),
);
