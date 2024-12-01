import {importProvidersFrom} from '@angular/core';
import {EffectsModule} from '@ngrx/effects';

import * as signinPageEffects from './signin-page.effects';

export const signinPageEffectsProvider = importProvidersFrom(
  EffectsModule.forFeature(signinPageEffects),
);
