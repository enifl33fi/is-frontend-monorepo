import {ENVIRONMENT_INITIALIZER, importProvidersFrom, inject} from '@angular/core';
import {lab1RootActions} from '@is/labs/lab1/shared/root/store';
import {EffectsModule} from '@ngrx/effects';
import {Store} from '@ngrx/store';

import * as rootEffects from './root.effects';

export const rootEffectsProvider = [
  importProvidersFrom(EffectsModule.forFeature(rootEffects)),
  {
    provide: ENVIRONMENT_INITIALIZER,
    multi: true,
    useValue: () => inject(Store).dispatch(lab1RootActions.init()),
  },
];
