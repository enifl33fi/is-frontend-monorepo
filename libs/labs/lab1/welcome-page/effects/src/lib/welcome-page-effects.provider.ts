import {importProvidersFrom} from '@angular/core';
import {EffectsModule} from '@ngrx/effects';

import * as welcomePageEffects from './welcome-page.effects';

export const welcomePageEffectsProvider = importProvidersFrom(
  EffectsModule.forFeature(welcomePageEffects),
);
