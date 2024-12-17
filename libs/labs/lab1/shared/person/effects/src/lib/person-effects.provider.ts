import {importProvidersFrom} from '@angular/core';
import {EffectsModule} from '@ngrx/effects';

import * as personEffects from './person.effects';

export const personEffectsProvider = importProvidersFrom(
  EffectsModule.forFeature(personEffects),
);
