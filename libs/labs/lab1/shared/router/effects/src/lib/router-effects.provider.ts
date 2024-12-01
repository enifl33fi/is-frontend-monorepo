import {importProvidersFrom} from '@angular/core';
import {EffectsModule} from '@ngrx/effects';

import * as routerEffects from './router.effects';

export const routerEffectsProvider = importProvidersFrom(
  EffectsModule.forFeature([routerEffects]),
);
