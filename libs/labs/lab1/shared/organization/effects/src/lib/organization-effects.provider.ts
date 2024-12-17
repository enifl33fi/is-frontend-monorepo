import {importProvidersFrom} from '@angular/core';
import {EffectsModule} from '@ngrx/effects';

import * as organizationEffects from './organization.effects';

export const organizationEffectsProvider = importProvidersFrom(
  EffectsModule.forFeature(organizationEffects),
);
