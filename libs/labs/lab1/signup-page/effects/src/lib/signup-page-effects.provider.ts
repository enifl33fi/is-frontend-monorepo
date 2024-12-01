import {importProvidersFrom} from '@angular/core';
import {EffectsModule} from '@ngrx/effects';

import * as signupPageEffects from './signup-page.effects';

export const signupPageEffectsProvider = importProvidersFrom(
  EffectsModule.forFeature(signupPageEffects),
);
